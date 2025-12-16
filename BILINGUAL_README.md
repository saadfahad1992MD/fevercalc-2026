# Fever Calculator - Bilingual Version (Arabic & English)

## 🌐 What's New

This version includes **full bilingual support** with:
- ✅ **Arabic** (العربية) - RTL layout
- ✅ **English** - LTR layout
- ✅ **Language selection page** on first launch
- ✅ **Language toggle button** in both versions
- ✅ **Persistent language preference** (saved in localStorage)

---

## 📱 Features

### Language Selection
- Beautiful language selection screen with flag icons
- Choose between Arabic (🇸🇦) and English (🇬🇧)
- Your choice is saved and remembered

### Arabic Version
- **Brand:** موقع حرارة
- **Direction:** RTL (Right-to-Left)
- **All text in Arabic** including:
  - UI elements
  - Medication names (أدول، فيفادول، بانادول، etc.)
  - Instructions and warnings
  - FAQ section

### English Version
- **Brand:** Fever Calc
- **Direction:** LTR (Left-to-Right)
- **All text in English** including:
  - UI elements
  - Medication names (Adol, Fevadol, Panadol, etc.)
  - Instructions and warnings
  - FAQ section

### Language Toggle
- **Top-left corner button** allows instant language switching
- **Arabic version:** Shows "EN" button
- **English version:** Shows "ع" button
- Returns to language selection page when clicked

---

## 🚀 How to Use

### Web Version
1. Open `index.html` in a browser
2. Select your preferred language
3. Use the calculator as normal
4. Click the language toggle button to switch languages

### iOS App
1. Open the project in Xcode:
   ```bash
   cd ios/App
   open App.xcworkspace
   ```
2. Build and run on simulator or device
3. Language selection works the same as web version

### Android App
1. Open the project in Android Studio:
   ```bash
   cd android
   ```
2. Build and run on emulator or device
3. Language selection works the same as web version

---

## 📂 Project Structure

```
fever-calculator-bilingual/
├── src/
│   ├── App.jsx                    # Arabic version
│   ├── AppEnglish.jsx             # English version
│   ├── AppWrapper.jsx             # Language router
│   ├── LanguageSelector.jsx       # Language selection page
│   └── components/
│       └── LanguageToggle.jsx     # Toggle button component
├── dist/                          # Built files
├── ios/                           # iOS app
├── android/                       # Android app
└── BILINGUAL_README.md            # This file
```

---

## 🔧 Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Sync with iOS/Android
```bash
npx cap sync
```

---

## 📝 Translation Details

### What's Translated
- ✅ All UI text (buttons, labels, headings)
- ✅ Medication names (Adol, Fevadol, Panadol, etc.)
- ✅ Instructions and warnings
- ✅ FAQ questions and answers
- ✅ Error messages
- ✅ Calculation results

### What's NOT Changed
- ✅ Medication images (same for both languages)
- ✅ Calculation logic (identical in both versions)
- ✅ Design and layout (same structure)
- ✅ Functionality (works exactly the same)

---

## ✨ Key Improvements

1. **Separate Components:** Arabic and English versions are completely separate, making maintenance easier
2. **No Breaking Changes:** Original Arabic version remains unchanged
3. **Clean Architecture:** Language selection logic is isolated in AppWrapper
4. **Persistent Preference:** User's language choice is saved
5. **Easy Switching:** One-click language toggle

---

## 🎯 Medication Name Translations

| Arabic | English |
|--------|---------|
| أدول | Adol |
| فيفادول | Fevadol |
| بانادول | Panadol |
| ديفادول | Defadol |
| نيوروفين | Nurofen |
| بروفين | Brufen |
| بروفينال | Profinal |
| سابوفين | Sapofen |
| روفيناك | Rofenac |
| فولتارين | Voltaren |
| تايلينول | Tylenol |

---

## 📱 Deployment

### Web
Upload the `dist/` folder to your web server.

### iOS
1. Open in Xcode
2. Select your team and signing certificate
3. Archive and upload to App Store

### Android
1. Open in Android Studio
2. Build → Generate Signed Bundle/APK
3. Upload to Google Play Console

---

## 🐛 Troubleshooting

### Language not switching?
- Clear browser cache and localStorage
- Refresh the page

### Text still in Arabic in English version?
- Make sure you built the project after changes
- Run `npm run build` and `npx cap sync`

### App not loading?
- Check browser console for errors
- Ensure all dependencies are installed (`npm install`)

---

## 📞 Support

For questions or issues, please contact the development team.

---

**Version:** 2.0 (Bilingual)  
**Last Updated:** October 29, 2025  
**Developer:** Dr. Saad's Team

