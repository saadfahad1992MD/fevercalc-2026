# Fever Calculator - Deployment Instructions

## حاسبة جرعات أدوية خفض الحرارة للأطفال

This is a React-based fever calculator application for children's medication dosages in Arabic.

## 🚀 Quick Deployment

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify
```bash
# Build the project
npm install
npm run build

# Upload the 'dist' folder to Netlify
```

### 3. GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### 4. Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

## 📦 Build Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Setup

No environment variables required. The application is fully client-side.

## 📁 Project Structure

```
fever-calculator/
├── public/           # Static assets
├── src/
│   ├── assets/       # Images and media
│   ├── components/   # UI components
│   ├── lib/         # Utilities
│   └── App.jsx      # Main application
├── package.json
└── vite.config.js
```

## 🌐 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- RTL (Right-to-Left) Arabic layout support

## 📝 Features

- ✅ Medication dosage calculator for children
- ✅ Support for Paracetamol, Ibuprofen, and Diclofenac
- ✅ Age and weight-based calculations
- ✅ Arabic language interface with RTL support
- ✅ Medical information and safety guidelines
- ✅ Responsive design for all devices

## 🔒 Security & Compliance

- Client-side only application
- No data collection or storage
- Medical disclaimers included
- Professional medical consultation recommended

## 📞 Support

For questions or support: fever.calc@gmail.com

---
**Developed by Dr. Saad bin Fahd Al-Mudaimigh**
