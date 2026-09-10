import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import { AyurvedaProduct } from '../../types';
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Tag,
  Info,
  ChevronRight
} from 'lucide-react';

export const Medicines: React.FC = () => {
  const { cart, addToCart, showToast } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<AyurvedaProduct | null>(null);

  const categories = ['All', 'Classical Formulations', 'Wellness Supplements', 'Herbal Extracts', 'Oils & Ghee'];

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.indications.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header & Cart trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Ayurvedic Formulations & Botanical Directory
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Reference directory of classical formulations, standardized herbal extracts, and commercial ASU products for IP clearance.
          </p>
        </div>

        <button
          onClick={() => navigate('/formulation-analysis')}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Analyze Custom Formulation</span>
        </button>
      </div>

      {/* Search & Category Tabs */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-3">
        <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5">
          <Search className="w-4 h-4 text-emerald-700 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search classical herbs, formulations (e.g. Triphala, Brahmi, Ashwagandha)..."
            className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map(prod => {
          const inCartItem = cart.find(i => i.product.id === prod.id);

          return (
            <div
              key={prod.id}
              className="p-4 rounded-2xl bg-white border border-stone-200/80 hover:border-emerald-300 shadow-2xs transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-stone-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {prod.isVerified && (
                    <span className="absolute top-2.5 left-2.5 text-[10px] font-bold bg-white/90 backdrop-blur-xs text-emerald-800 px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      AYUSH Verified
                    </span>
                  )}
                  {prod.requiresPrescription && (
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold bg-amber-500/90 backdrop-blur-xs text-white px-2 py-0.5 rounded-md shadow-2xs">
                      Rx Required
                    </span>
                  )}
                </div>

                {/* Brand & Name */}
                <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                  {prod.brand}
                </span>
                <h3 className="font-bold text-stone-900 text-sm mt-0.5 line-clamp-1">{prod.name}</h3>
                {prod.sanskritName && (
                  <p className="text-[11px] text-emerald-800 font-medium font-serif">{prod.sanskritName}</p>
                )}

                <p className="text-xs text-stone-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Rating & Dosage Form */}
                <div className="flex items-center justify-between mt-3 text-xs">
                  <span className="flex items-center gap-1 font-bold text-amber-800">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    {prod.rating} <span className="text-stone-400 font-normal">({prod.reviewsCount})</span>
                  </span>
                  <span className="text-stone-500 font-mono text-[11px]">{prod.dosageForm}</span>
                </div>
              </div>

              {/* Price & Add to Cart */}
              <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-extrabold text-stone-900">₹{prod.price}</span>
                    <span className="text-xs text-stone-400 line-through">₹{prod.mrp}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block">In Stock ({prod.stockCount})</span>
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
                    title="Product Specifications"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {inCartItem ? `Add (${inCartItem.quantity})` : 'Add to Basket'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              {selectedProduct.category}
            </span>
            <h3 className="text-lg font-bold text-stone-900 mt-1">{selectedProduct.name}</h3>
            <p className="text-xs text-stone-500 font-medium">{selectedProduct.brand}</p>

            <div className="mt-4 space-y-3 text-xs">
              <p className="text-stone-600 leading-relaxed">{selectedProduct.description}</p>

              <div>
                <h5 className="font-bold text-stone-900 mb-1">Key Botanical Ingredients:</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedProduct.ingredients.map((ing, i) => (
                    <span key={i} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md text-[11px]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-bold text-stone-900 mb-1">Traditional Indications:</h5>
                <p className="text-stone-600">{selectedProduct.indications.join(' • ')}</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1">
                <p><span className="font-bold">Batch Barcode:</span> {selectedProduct.batchNumber}</p>
                <p><span className="font-bold">AYUSH Manufacturing License:</span> {selectedProduct.ayushLicense}</p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-stone-900">₹{selectedProduct.price}</span>
                </div>
                <button
                  onClick={() => {
                    addToCart(selectedProduct, 1);
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Add to Prescription Basket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
