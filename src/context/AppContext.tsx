import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  LanguageCode,
  UserProfile,
  CartItem,
  AyurvedaProduct,
  Prescription,
  Appointment,
  Order,
  SavedAIAnswer,
  NotificationItem,
  AISourceChain
} from '../types';
import {
  mockUsers,
  mockPrescriptions,
  mockAppointments,
  mockOrders,
  mockNotifications,
  mockProducts
} from '../data/mockData';
import { translations, Translations } from '../i18n/translations';

export interface ToastNotification {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: keyof Translations) => string;
  cart: CartItem[];
  addToCart: (product: AyurvedaProduct, quantity?: number, prescribedDose?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  prescriptions: Prescription[];
  addPrescription: (prescription: Prescription) => void;
  appointments: Appointment[];
  bookAppointment: (doctorName: string, date: string, time: string, type: 'Video Consultation' | 'In-Clinic', reason: string) => void;
  cancelAppointment: (id: string) => void;
  orders: Order[];
  createOrderFromCart: (pharmacyName?: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  savedAnswers: SavedAIAnswer[];
  saveAnswer: (question: string, summary: string, category: string, sourcesCount: number) => void;
  deleteSavedAnswer: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toasts: ToastNotification[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  inspectSourceChain: AISourceChain | null;
  setInspectSourceChain: (chain: AISourceChain | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('patient');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: mockProducts[0],
      quantity: 1,
      prescribedDose: '1 tsp with warm water at bedtime'
    }
  ]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [inspectSourceChain, setInspectSourceChain] = useState<AISourceChain | null>(null);

  const [savedAnswers, setSavedAnswers] = useState<SavedAIAnswer[]>([
    {
      id: 'ans-01',
      question: 'Can Ashwagandha be taken with warm milk for insomnia?',
      summary: 'According to Charaka Samhita, Ashwagandha pacifies Vata in Majja Dhatu. Combining with warm cow milk or almond milk acts as an optimal Sheeta-Snigdha anupana.',
      date: 'Sep 01, 2026',
      category: 'Rasayana & Sleep',
      confidence: 'high',
      sourcesCount: 3
    }
  ]);

  const currentUser = mockUsers[role];

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(`Switched workspace to ${newRole.toUpperCase()}`, `Active user: ${mockUsers[newRole].name}`, 'info');
  };

  const t = (key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'tst-' + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(item => item.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(item => item.id !== id));
  };

  const addToCart = (product: AyurvedaProduct, quantity = 1, prescribedDose?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, prescribedDose }];
    });
    showToast(`Added to Prescription Basket`, `${product.name} (${quantity})`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Removed from Basket', undefined, 'info');
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addPrescription = (prescription: Prescription) => {
    setPrescriptions(prev => [prescription, ...prev]);
    showToast('Prescription Approved by Doctor', `Case: ${prescription.patientName} (${prescription.diagnosis})`, 'success');
    // Also notify patient
    setNotifications(prev => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Prescription Issued',
        message: `${prescription.doctorName} generated prescription for ${prescription.diagnosis}.`,
        timestamp: 'Just now',
        type: 'prescription',
        read: false,
        actionUrl: '/patient/prescriptions'
      },
      ...prev
    ]);
  };

  const bookAppointment = (doctorName: string, date: string, time: string, type: 'Video Consultation' | 'In-Clinic', reason: string) => {
    const newApt: Appointment = {
      id: 'apt-' + Date.now().toString().slice(-4),
      doctorId: 'doc-01',
      doctorName,
      doctorSpecialty: 'Digestive Health & Lifestyle',
      doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=80',
      patientName: 'Anjali Sharma',
      patientAge: 29,
      date,
      time,
      type,
      status: 'upcoming',
      reason,
      meetLink: 'https://meet.ayursahayak.in/cons-' + Math.floor(100 + Math.random() * 900)
    };
    setAppointments(prev => [newApt, ...prev]);
    showToast('Appointment Confirmed!', `${doctorName} on ${date} at ${time}`, 'success');
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
    showToast('Appointment Cancelled', undefined, 'info');
  };

  const createOrderFromCart = (pharmacyName = 'Green Ayurveda Pharmacy'): Order => {
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const newOrder: Order = {
      id: 'ord-' + Math.floor(1000 + Math.random() * 9000),
      orderDate: 'Today, Just now',
      prescriptionId: prescriptions[0]?.id,
      pharmacyName,
      pharmacyPhone: '+91 80 2520 7890',
      deliveryAddress: 'Flat 402, Lotus Residency, 12th Main Indiranagar, Bengaluru - 560038',
      totalAmount,
      status: 'placed',
      items: [...cart],
      trackingSteps: [
        { title: 'Prescription Verified & Order Placed', timestamp: 'Just now', completed: true, active: false },
        { title: 'Pharmacy Accepted & Batch Authenticated', timestamp: 'Pending', completed: false, active: true },
        { title: 'Formulations Dispensed & Packed', timestamp: 'Pending', completed: false, active: false },
        { title: 'Rider Dispatched (Eco-Delivery)', timestamp: 'Pending', completed: false, active: false },
        { title: 'Out for Delivery', timestamp: 'Pending', completed: false, active: false },
        { title: 'Delivered to Doorstep', timestamp: 'Pending', completed: false, active: false }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast('Rx Order Placed Successfully!', `Routed to ${pharmacyName}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => {
        if (ord.id === orderId) {
          const stepIndexMap: Record<Order['status'], number> = {
            placed: 0,
            accepted: 1,
            preparing: 2,
            dispatched: 3,
            out_for_delivery: 4,
            delivered: 5
          };
          const targetIndex = stepIndexMap[status];
          const newSteps = ord.trackingSteps.map((step, idx) => ({
            ...step,
            completed: idx <= targetIndex,
            active: idx === targetIndex
          }));
          return { ...ord, status, trackingSteps: newSteps };
        }
        return ord;
      })
    );
    showToast(`Order Status Updated`, `Order #${orderId} marked as ${status.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const saveAnswer = (question: string, summary: string, category: string, sourcesCount: number) => {
    const newSave: SavedAIAnswer = {
      id: 'ans-' + Date.now(),
      question,
      summary,
      date: 'Today',
      category,
      confidence: 'high',
      sourcesCount
    };
    setSavedAnswers(prev => [newSave, ...prev]);
    showToast('Saved to My Ayurveda Knowledge', undefined, 'success');
  };

  const deleteSavedAnswer = (id: string) => {
    setSavedAnswers(prev => prev.filter(item => item.id !== id));
    showToast('Answer removed from saved', undefined, 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(item => (item.id === id ? { ...item, read: true } : item))
    );
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        language,
        setLanguage,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        prescriptions,
        addPrescription,
        appointments,
        bookAppointment,
        cancelAppointment,
        orders,
        createOrderFromCart,
        updateOrderStatus,
        savedAnswers,
        saveAnswer,
        deleteSavedAnswer,
        notifications,
        markNotificationRead,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        showToast,
        removeToast,
        inspectSourceChain,
        setInspectSourceChain
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
