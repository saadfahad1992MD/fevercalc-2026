import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'

// Import Saudi (default) components
import AppSaudiArabic from './App.jsx'
import AppSaudiEnglish from './AppEnglish.jsx'

// Import country-specific components
import AppPhilippinesTagalog from './countries/philippines/AppTagalog.jsx'
import AppPhilippinesEnglish from './countries/philippines/AppEnglish.jsx'
import AppIndonesiaIndonesian from './countries/indonesia/AppIndonesian.jsx'
import AppIndonesiaEnglish from './countries/indonesia/AppEnglish.jsx'
import AppMexicoSpanish from './countries/mexico/AppSpanish.jsx'
import AppMexicoEnglish from './countries/mexico/AppEnglish.jsx'
import AppBrazilPortuguese from './countries/brazil/AppPortuguese.jsx'
import AppBrazilEnglish from './countries/brazil/AppEnglish.jsx'
import AppNigeriaEnglish from './countries/nigeria/AppEnglish.jsx'
import AppIndiaHindi from './countries/india/AppHindi.jsx'
import AppIndiaEnglish from './countries/india/AppEnglish.jsx'
import AppEgyptArabic from './countries/egypt/AppArabic.jsx'
import AppEgyptEnglish from './countries/egypt/AppEnglish.jsx'

// Country configuration
export const countries = {
  sa: {
    code: 'sa',
    name: 'Saudi Arabia',
    nameNative: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    path: '/',
    languages: ['ar', 'en'],
    defaultLanguage: 'ar',
    PrimaryApp: AppSaudiArabic,
    SecondaryApp: AppSaudiEnglish
  },
  ph: {
    code: 'ph',
    name: 'Philippines',
    nameNative: 'Pilipinas',
    flag: '🇵🇭',
    path: '/ph',
    languages: ['en', 'tl'],
    defaultLanguage: 'en',
    PrimaryApp: AppPhilippinesEnglish,
    SecondaryApp: AppPhilippinesTagalog
  },
  id: {
    code: 'id',
    name: 'Indonesia',
    nameNative: 'Indonesia',
    flag: '🇮🇩',
    path: '/id',
    languages: ['id', 'en'],
    defaultLanguage: 'id',
    PrimaryApp: AppIndonesiaIndonesian,
    SecondaryApp: AppIndonesiaEnglish
  },
  mx: {
    code: 'mx',
    name: 'Mexico',
    nameNative: 'México',
    flag: '🇲🇽',
    path: '/mx',
    languages: ['es', 'en'],
    defaultLanguage: 'es',
    PrimaryApp: AppMexicoSpanish,
    SecondaryApp: AppMexicoEnglish
  },
  br: {
    code: 'br',
    name: 'Brazil',
    nameNative: 'Brasil',
    flag: '🇧🇷',
    path: '/br',
    languages: ['pt', 'en'],
    defaultLanguage: 'pt',
    PrimaryApp: AppBrazilPortuguese,
    SecondaryApp: AppBrazilEnglish
  },
  ng: {
    code: 'ng',
    name: 'Nigeria',
    nameNative: 'Nigeria',
    flag: '🇳🇬',
    path: '/ng',
    languages: ['en'],
    defaultLanguage: 'en',
    PrimaryApp: AppNigeriaEnglish,
    SecondaryApp: null
  },
  in: {
    code: 'in',
    name: 'India',
    nameNative: 'भारत',
    flag: '🇮🇳',
    path: '/in',
    languages: ['en', 'hi'],
    defaultLanguage: 'en',
    PrimaryApp: AppIndiaEnglish,
    SecondaryApp: AppIndiaHindi
  },
  eg: {
    code: 'eg',
    name: 'Egypt',
    nameNative: 'مصر',
    flag: '🇪🇬',
    path: '/eg',
    languages: ['ar', 'en'],
    defaultLanguage: 'ar',
    PrimaryApp: AppEgyptArabic,
    SecondaryApp: AppEgyptEnglish
  }
}

// Map IP country codes to our country codes
const countryCodeMap = {
  'SA': 'sa',
  'PH': 'ph',
  'ID': 'id',
  'MX': 'mx',
  'BR': 'br',
  'NG': 'ng',
  'IN': 'in',
  'EG': 'eg'
}

// Country wrapper component
function CountryPage({ countryCode }) {
  const country = countries[countryCode]
  const navigate = useNavigate()
  
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(`fevercalc_lang_${countryCode}`)
    return saved || country?.defaultLanguage || 'en'
  })

  useEffect(() => {
    if (!country) return
    
    // Set document direction for RTL languages
    const isRTL = language === 'ar'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Set page title
    const titles = {
      sa: language === 'ar' ? 'حاسبة جرعات الحرارة للأطفال | السعودية' : 'Fever Calculator | Saudi Arabia',
      ph: 'Pediatric Fever Calculator | Philippines',
      id: language === 'id' ? 'Kalkulator Dosis Demam Anak | Indonesia' : 'Fever Calculator | Indonesia',
      mx: language === 'es' ? 'Calculadora de Dosis para Fiebre | México' : 'Fever Calculator | Mexico',
      br: language === 'pt' ? 'Calculadora de Dose para Febre | Brasil' : 'Fever Calculator | Brazil',
      ng: 'Pediatric Fever Calculator | Nigeria',
      in: 'Pediatric Fever Calculator | India',
      eg: language === 'ar' ? 'حاسبة جرعات الحرارة للأطفال | مصر' : 'Fever Calculator | Egypt'
    }
    document.title = titles[countryCode] || 'Fever Calculator'
  }, [language, countryCode, country])

  const handleLanguageChange = () => {
    if (!country || country.languages.length < 2) return
    
    const currentIndex = country.languages.indexOf(language)
    const nextIndex = (currentIndex + 1) % country.languages.length
    const newLang = country.languages[nextIndex]
    
    setLanguage(newLang)
    localStorage.setItem(`fevercalc_lang_${countryCode}`, newLang)
  }

  const handleCountryChange = (newCountryCode) => {
    const newCountry = countries[newCountryCode]
    if (newCountry) {
      navigate(newCountry.path)
    }
  }

  if (!country) {
    return <Navigate to="/" replace />
  }

  // Determine which app to render
  const isPrimaryLanguage = language === country.defaultLanguage
  const AppComponent = isPrimaryLanguage ? country.PrimaryApp : (country.SecondaryApp || country.PrimaryApp)

  return (
    <AppComponent 
      onChangeLanguage={handleLanguageChange}
      country={countryCode.toUpperCase()}
      language={language}
      onCountryChange={handleCountryChange}
    />
  )
}

// Geolocation redirect component
function GeoRedirect() {
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    // Only redirect from root path
    if (location.pathname !== '/') return
    
    // Check if already redirected this session
    const hasRedirected = sessionStorage.getItem('fevercalc_geo_redirected')
    if (hasRedirected) return
    
    // Try to get country from Vercel header (set by middleware) or IP API
    async function detectAndRedirect() {
      try {
        // First check if we have a country hint from Vercel middleware
        const countryHint = document.querySelector('meta[name="x-vercel-ip-country"]')?.content
        
        let detectedCountry = countryHint
        
        if (!detectedCountry) {
          // Fallback to IP API
          const response = await fetch('https://ipapi.co/json/')
          const data = await response.json()
          detectedCountry = data.country_code
        }
        
        console.log('Detected country:', detectedCountry)
        
        // Map to our country code
        const ourCountryCode = countryCodeMap[detectedCountry]
        
        if (ourCountryCode && ourCountryCode !== 'sa') {
          const country = countries[ourCountryCode]
          if (country) {
            sessionStorage.setItem('fevercalc_geo_redirected', 'true')
            navigate(country.path, { replace: true })
          }
        }
      } catch (error) {
        console.error('Geolocation detection failed:', error)
      }
    }
    
    detectAndRedirect()
  }, [navigate, location.pathname])
  
  return null
}

// Main App Router
export function AppRouter() {
  return (
    <BrowserRouter>
      <GeoRedirect />
      <Routes>
        {/* Saudi Arabia - Root */}
        <Route path="/" element={<CountryPage countryCode="sa" />} />
        
        {/* Philippines */}
        <Route path="/ph" element={<CountryPage countryCode="ph" />} />
        
        {/* Indonesia */}
        <Route path="/id" element={<CountryPage countryCode="id" />} />
        
        {/* Mexico */}
        <Route path="/mx" element={<CountryPage countryCode="mx" />} />
        
        {/* Brazil */}
        <Route path="/br" element={<CountryPage countryCode="br" />} />
        
        {/* Nigeria */}
        <Route path="/ng" element={<CountryPage countryCode="ng" />} />
        
        {/* India */}
        <Route path="/in" element={<CountryPage countryCode="in" />} />
        
        {/* Egypt */}
        <Route path="/eg" element={<CountryPage countryCode="eg" />} />
        
        {/* Catch all - redirect to root */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
