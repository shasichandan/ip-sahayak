# IP-SAKTI Sahayak 🌿⚖️

**Ayurveda IP & Regulatory AI Platform**

IP-SAKTI Sahayak is an advanced, enterprise-grade web application designed to bridge the gap between traditional Ayurvedic knowledge, Intellectual Property (IP) protection, and modern healthcare regulations. Built with React, TypeScript, and Tailwind CSS, it provides a comprehensive suite of tools for formulation analysis, IP regime management, and clinical workflows.

## 🚀 Features

### 🛡️ Analysis & Protection
- **IP Regime Analysis:** Comprehensive tools covering 10 regimes including Patents (Sec 3(p)), Trademarks (Class 5), Geographical Indications, Copyrights, Industrial Designs, Trade Secrets, and Plant Varieties (PPV&FR).
- **Formulation Analysis:** Detailed breakdown and IP assessment of Ayurvedic formulations.
- **Traditional Knowledge (TKDL):** Dedicated integration and exploration of the Traditional Knowledge Digital Library.
- **Drug Classification:** Automated categorization and classification of Ayurvedic drugs.
- **ABS Compliance (NBA):** Ensure Access and Benefit Sharing compliance under the National Biodiversity Authority guidelines.

### 📖 Research & Evidence
- **Source Explorer:** Dig through ancient texts and modern literature.
- **Research & Patents Prior Art:** Specialized tools for prior art searching and patent landscaping.
- **Saved Reports & Dossiers:** Organize, save, and manage your regulatory research.

### 🏥 Clinical & Health Hub
- **Clinical Dashboard:** A unified overview of daily clinical operations.
- **Doctor Consultations & Appointments:** Seamless scheduling and patient management.
- **Prescriptions & Medicines:** Digital prescriptions linked directly to specific formulations.
- **Orders & Dispensing:** Track medication distribution.
- **Health Records:** Secure management of patient history and records.

## 🛠️ Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shasichandan/ip-sahayak.git
   cd ip-sahayak
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` (or the port specified by Vite in your terminal).

## 📂 Project Structure

```text
├── src/
│   ├── components/      # Reusable UI elements and feature components
│   │   ├── common/      # Global components (Sidebar, TopNavbar, etc.)
│   │   ├── ui/          # Core primitives (DrilldownMenu, etc.)
│   │   └── ...          # Feature-specific components
│   ├── context/         # React Context providers (AppContext)
│   ├── lib/             # Utility functions (cn class merger)
│   ├── types/           # Global TypeScript interfaces
│   ├── App.tsx          # Main application router/entry
│   └── main.tsx         # React DOM rendering
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Project metadata and scripts
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the [issues page](https://github.com/shasichandan/ip-sahayak/issues).

## 📄 License

This project is licensed under the MIT License.

