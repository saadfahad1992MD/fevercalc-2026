import { Button } from '@/components/ui/button.jsx';

export function LanguageToggle({ currentLanguage, onToggle, targetLanguage, countryCode }) {
  // Determine what to show based on current language
  // The button shows the NEXT language (what you'll switch TO)
  let flag, text;
  
  // Language display mapping
  const languageDisplay = {
    ar: { flag: '🇸🇦', text: 'العربية' },
    en: { flag: '🇬🇧', text: 'English' },
    hi: { flag: '🇮🇳', text: 'हिंदी' },
    tl: { flag: '🇵🇭', text: 'Tagalog' },
    id: { flag: '🇮🇩', text: 'Bahasa' },
    tr: { flag: '🇹🇷', text: 'Türkçe' },
    es: { flag: '🇲🇽', text: 'Español' },
    pt: { flag: '🇧🇷', text: 'Português' }
  };
  
  // Country-specific default target languages
  const countryTargetLanguages = {
    sa: 'ar',
    eg: 'ar',
    ph: 'tl',
    id: 'id',
    tr: 'tr',
    mx: 'es',
    br: 'pt',
    in: 'hi',
    ng: null // Nigeria is English-only
  };
  
  // Determine the target language
  const target = targetLanguage || (countryCode ? countryTargetLanguages[countryCode] : 'ar');
  
  if (currentLanguage === 'en') {
    // Currently English -> show the local language option
    if (target && languageDisplay[target]) {
      flag = languageDisplay[target].flag;
      text = languageDisplay[target].text;
    } else {
      // No toggle needed for English-only countries
      return null;
    }
  } else {
    // Currently in local language -> show English option
    flag = '🇬🇧';
    text = 'English';
  }
  
  // Fallback if flag/text are still undefined
  if (!flag || !text) {
    flag = '🇬🇧';
    text = 'English';
  }
  
  return (
    <Button
      onClick={onToggle}
      style={{ position: 'fixed', top: '5px', left: '5px', zIndex: 9999 }}
      className="gap-1 shadow-lg bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 hover:border-gray-400 px-2 py-1 h-auto text-[10px] sm:text-xs sm:px-2.5 sm:py-1.5 sm:gap-1.5 !fixed"
    >
      <span className="text-base sm:text-xl">{flag}</span>
      <span className="font-semibold text-[10px] sm:text-xs">{text}</span>
    </Button>
  );
}
