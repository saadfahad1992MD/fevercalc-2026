// Geolocation utility to detect user's country

/**
 * Detects the user's country based on their IP address
 * Returns 'EG' for Egypt, or other country codes
 * Falls back to 'DEFAULT' if detection fails
 */
export async function detectUserCountry() {
  try {
    // Try multiple geolocation services for reliability
    
    // First try: ipapi.co (free, no API key required)
    try {
      const response = await fetch('https://ipapi.co/json/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Detected country from ipapi.co:', data.country_code);
        return data.country_code || 'DEFAULT';
      }
    } catch (error) {
      console.warn('ipapi.co failed:', error);
    }

    // Second try: ip-api.com (free, no API key required)
    try {
      const response = await fetch('http://ip-api.com/json/', {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Detected country from ip-api.com:', data.countryCode);
        return data.countryCode || 'DEFAULT';
      }
    } catch (error) {
      console.warn('ip-api.com failed:', error);
    }

    // Third try: ipwhois.app (free, no API key required)
    try {
      const response = await fetch('https://ipwhois.app/json/', {
        method: 'GET'
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Detected country from ipwhois.app:', data.country_code);
        return data.country_code || 'DEFAULT';
      }
    } catch (error) {
      console.warn('ipwhois.app failed:', error);
    }

    // If all services fail, return DEFAULT
    console.warn('All geolocation services failed, using DEFAULT');
    return 'DEFAULT';
    
  } catch (error) {
    console.error('Error detecting user country:', error);
    return 'DEFAULT';
  }
}

/**
 * Detects country from browser language as fallback
 * Returns country code based on language
 */
export function detectCountryFromLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  console.log('Browser language:', browserLang);
  
  // Map language codes to country codes
  if (browserLang.startsWith('id')) return 'ID'; // Indonesian
  if (browserLang.startsWith('hi')) return 'IN'; // Hindi
  if (browserLang.startsWith('tl') || browserLang.startsWith('fil')) return 'PH'; // Tagalog/Filipino
  if (browserLang.startsWith('ar')) {
    // Arabic - need to distinguish between countries
    // For now, default to Saudi Arabia for Arabic
    return 'SA';
  }
  
  return 'DEFAULT';
}

/**
 * Gets the country from localStorage or detects it
 * Respects manual country override for testing
 * Uses both IP geolocation and browser language detection
 */
export async function getUserCountry() {
  // Check if user manually selected a country (for testing)
  const countryOverride = localStorage.getItem('countryOverride');
  const cachedCountry = localStorage.getItem('userCountry');
  
  // If user manually selected a country, use that
  if (countryOverride === 'true' && cachedCountry) {
    console.log('Using manually selected country:', cachedCountry);
    return cachedCountry;
  }
  
  // Check if country was auto-detected and cached
  if (cachedCountry && !countryOverride) {
    console.log('Using cached auto-detected country:', cachedCountry);
    return cachedCountry;
  }
  
  // Auto-detect country using IP geolocation
  let country = await detectUserCountry();
  
  // If geolocation returns DEFAULT, try language detection as fallback
  if (country === 'DEFAULT') {
    console.log('Geolocation returned DEFAULT, trying language detection...');
    country = detectCountryFromLanguage();
    console.log('Language-based detection result:', country);
  }
  
  localStorage.setItem('userCountry', country);
  // Mark as auto-detected (not manual override)
  localStorage.removeItem('countryOverride');
  
  console.log('Auto-detected and cached country:', country);
  return country;
}

/**
 * Clears the cached country (useful for testing)
 */
export function clearCountryCache() {
  localStorage.removeItem('userCountry');
  localStorage.removeItem('countryOverride');
}
