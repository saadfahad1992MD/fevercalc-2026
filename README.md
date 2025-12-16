# Fever Calculator for Children (حاسبة جرعات أدوية خفض الحرارة للأطفال)

A professional web application for calculating medication dosages for children based on their age and weight. Built with React, Vite, and TailwindCSS.

## Features

- **Accurate Dosage Calculation**: Calculate precise medication dosages based on child's age and weight
- **Multiple Medication Types**: Support for both syrups/drops and suppositories
- **Comprehensive Drug Database**: Includes popular medications like Paracetamol, Ibuprofen, and Diclofenac
- **Safety Warnings**: Built-in age restrictions and safety guidelines
- **Arabic Language Support**: Full RTL (Right-to-Left) layout and Arabic interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Educational Content**: Medical information and FAQ sections

## Supported Medications

### Paracetamol (Acetaminophen)
- Adol Drops (100mg/1ml)
- Adol Syrup (120mg/5ml)
- Fevadol (160mg/5ml)
- Panadol (120mg/5ml)

### Ibuprofen (Age 6+ months)
- Nurofen (100mg/5ml)
- Brufen (100mg/5ml)
- Profinal (100mg/5ml)
- Sapofen (100mg/5ml)

### Suppositories
- Various strengths of Paracetamol and Diclofenac suppositories

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Language**: TypeScript/JavaScript

## Quick Start

1. **Clone or extract the project**
   ```bash
   tar -xzf fever-calculator-source-code.tar.gz
   cd fever-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Deployment

This application can be deployed on various platforms:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag `dist` folder or connect GitHub repo
- **GitHub Pages**: Use `gh-pages` package
- **Firebase Hosting**: `firebase deploy`
- **Surge.sh**: `surge` from `dist` directory

See `deployment-instructions.md` for detailed deployment guides.

## Project Structure

```
fever-calculator/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── medications/     # Medication images
│   │   └── suppositories/   # Suppository images
│   ├── components/
│   │   └── ui/             # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features Implementation

### Dosage Calculation Algorithm
- Weight-based calculations following pediatric guidelines
- Age restrictions for different medication types
- Maximum daily dose limits
- Frequency recommendations

### Safety Features
- Prominent warning messages
- Age-appropriate medication filtering
- Drug interaction warnings
- Professional medical disclaimer

### User Experience
- Intuitive medication selection with visual cards
- Real-time calculation results
- Clear dosage instructions
- Educational medical information

## Medical Disclaimer

⚠️ **Important**: This application is for educational and guidance purposes only. Always consult with a healthcare professional before administering any medication to children. Do not exceed recommended dosages or duration of treatment.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

This is a medical application. Any modifications should be reviewed by medical professionals to ensure accuracy and safety.

## License

All rights reserved. This application contains proprietary medical calculations and should not be copied or redistributed without permission.

## Contact

For questions or support: fever.calc@gmail.com

---

**موقع حرارة** - Professional medication dosage calculator for children
