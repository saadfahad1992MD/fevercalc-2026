import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Globe } from 'lucide-react'

export default function CountrySelector({ currentCountry, onCountryChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const countries = [
    { code: 'AUTO', name: 'Auto-detect', nameAr: 'تلقائي', flag: '🌍' },
    { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', flag: '🇸🇦' },
    { code: 'EG', name: 'Egypt', nameAr: 'مصر', flag: '🇪🇬' },
    { code: 'IN', name: 'India', nameAr: 'الهند', flag: '🇮🇳' },
    { code: 'PH', name: 'Philippines', nameAr: 'الفلبين', flag: '🇵🇭' }
  ]

  const handleCountrySelect = (code) => {
    setIsOpen(false)
    
    // Set localStorage FIRST before any other operations
    if (code === 'AUTO') {
      localStorage.removeItem('userCountry')
      localStorage.removeItem('countryOverride')
    } else {
      // For manual selection, set both values
      localStorage.setItem('userCountry', code)
      localStorage.setItem('countryOverride', 'true')
    }
    
    // Force a hard reload to ensure localStorage is persisted
    setTimeout(() => {
      window.location.reload(true)
    }, 100)
  }

  const getCurrentCountryInfo = () => {
    const override = localStorage.getItem('countryOverride')
    if (!override) {
      return countries[0] // Auto-detect
    }
    return countries.find(c => c.code === currentCountry) || countries[0]
  }

  const currentInfo = getCurrentCountryInfo()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg rounded-full w-14 h-14 flex items-center justify-center"
        title="Change Country for Testing"
      >
        <span className="text-2xl">{currentInfo.flag}</span>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 min-w-[200px]">
          <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-200">
            Testing Mode
          </div>
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country.code)}
              className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center gap-2 ${
                currentInfo.code === country.code ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <span className="text-xl">{country.flag}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{country.name}</div>
                <div className="text-xs text-gray-500">{country.nameAr}</div>
              </div>
              {currentInfo.code === country.code && (
                <span className="text-blue-600">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
