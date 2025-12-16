import { useState, useEffect } from 'react'
import App from './App.jsx'
import AppEnglish from './AppEnglish.jsx'
import AppIndia from './AppIndia.jsx'
import AppIndiaEnglish from './AppIndiaEnglish.jsx'
// import AppPhilippines from './AppPhilippines.jsx'
import { LanguageSelector } from './LanguageSelector.jsx'
import CountrySelector from './components/CountrySelector.jsx'
import { getUserCountry } from './utils/geolocation.js'

export function AppWrapper() {
  const [language, setLanguage] = useState(null) // Will be set based on country
  const [country, setCountry] = useState('DEFAULT')
  const [isLoadingCountry, setIsLoadingCountry] = useState(true)
  
  // Check if admin mode is enabled via URL parameter
  const isAdmin = new URLSearchParams(window.location.search).get('admin') === 'true'

  // Detect user's country on mount
  useEffect(() => {
    async function detectCountry() {
      try {
        const detectedCountry = await getUserCountry()
        setCountry(detectedCountry)
        console.log('User country detected:', detectedCountry)
        
        // Redirect logic: Send users to their country-specific subdomain
        // Only redirect if on main domain (fevercalc.com)
        const isMainDomain = window.location.hostname === 'fevercalc.com' || window.location.hostname === 'www.fevercalc.com'
        const hasBeenRedirected = sessionStorage.getItem('fevercalc_redirected')
        
        if (isMainDomain && !hasBeenRedirected) {
          let redirectUrl = null
          
          // Country-specific redirects
          if (detectedCountry === 'ID') {
            // Indonesia
            redirectUrl = 'https://fever-calc-indonesia.vercel.app'
          } else if (detectedCountry === 'IN') {
            // India
            redirectUrl = 'https://fever-calculator-india.vercel.app'
          } else if (detectedCountry === 'PH') {
            // Philippines
            redirectUrl = 'https://fever-calc-philippines.vercel.app'
          } else if (detectedCountry === 'EG') {
            // Egypt
            redirectUrl = 'https://fever-calc-egypt.vercel.app'
          } else if (detectedCountry === 'NG') {
            // Nigeria
            redirectUrl = 'https://fever-calc-nigeria.vercel.app'
          } else if (detectedCountry === 'US') {
            // United States
            redirectUrl = 'https://fever-calc-us.vercel.app'
          } else if (detectedCountry === 'BR') {
            // Brazil
            redirectUrl = 'https://fever-calc-brasil.vercel.app'
          }
          
          // Perform redirect if determined
          if (redirectUrl) {
            console.log('Redirecting to:', redirectUrl)
            sessionStorage.setItem('fevercalc_redirected', 'true')
            window.location.href = redirectUrl
            return // Stop further execution
          }
        }
        
        // Set default language based on country if not already set
        const savedLanguage = localStorage.getItem('selectedLanguage')
        if (!savedLanguage) {
          // India -> Hindi, Philippines -> Tagalog, others -> Arabic
          const defaultLang = detectedCountry === 'IN' ? 'hi' : (detectedCountry === 'PH' ? 'tl' : 'ar')
          setLanguage(defaultLang)
          document.documentElement.dir = defaultLang === 'ar' ? 'rtl' : 'ltr'
          document.documentElement.lang = defaultLang
        } else {
          setLanguage(savedLanguage)
        }
      } catch (error) {
        console.error('Error detecting country:', error)
        setCountry('DEFAULT')
        setLanguage('ar') // Default to Arabic
      } finally {
        setIsLoadingCountry(false)
      }
    }
    
    detectCountry()
  }, [])

  // Language initialization is now handled in detectCountry

  const handleSelectLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('selectedLanguage', lang)
    // Set document direction
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const handleChangeLanguage = () => {
    // For India: toggle between Hindi (hi) and English (en)
    // For Philippines: toggle between Tagalog (tl) and English (en)
    // For others: toggle between Arabic (ar) and English (en)
    let newLanguage
    if (country === 'IN') {
      newLanguage = language === 'hi' ? 'en' : 'hi'
    } else if (country === 'PH') {
      newLanguage = language === 'tl' ? 'en' : 'tl' // Toggle between Tagalog and English
    } else {
      newLanguage = language === 'ar' ? 'en' : 'ar'
    }
    setLanguage(newLanguage)
    localStorage.setItem('selectedLanguage', newLanguage)
    // Set document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLanguage
  }

  // Show loading state while detecting country
  if (isLoadingCountry) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    )
  }

  // Show appropriate version based on country and language
  // India: Hindi (hi) or English (en)
  // Others: Arabic (ar) or English (en)
  
  // Render the appropriate app version
  let appContent
  
  if (country === 'IN') {
    // India version
    if (language === 'hi') {
      appContent = <AppIndia onChangeLanguage={handleChangeLanguage} />
    } else {
      appContent = <AppIndiaEnglish onChangeLanguage={handleChangeLanguage} />
    }
  } else if (country === 'PH') {
    // Philippines version - English only for now (Tagalog coming soon)
    appContent = <AppEnglish onChangeLanguage={handleChangeLanguage} country={country} />
  } else if (language === 'ar') {
    // Saudi/Egypt/Default version - Arabic
    appContent = <App onChangeLanguage={handleChangeLanguage} country={country} language={language} />
  } else {
    // Saudi/Egypt/Default version - English
    appContent = <AppEnglish onChangeLanguage={handleChangeLanguage} country={country} />
  }
  
  return (
    <>
      {appContent}
      {/* Only show country selector in admin mode */}
      {isAdmin && <CountrySelector currentCountry={country} />}
    </>
  )
}
