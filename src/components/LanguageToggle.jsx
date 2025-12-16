import { Button } from '@/components/ui/button.jsx';

export function LanguageToggle({ currentLanguage, onToggle, targetLanguage }) {
  // Determine what to show based on current language
  // The button shows the NEXT language (what you'll switch TO)
  let flag, text;
  
  if (currentLanguage === 'ar') {
    // Currently Arabic -> show English option
    flag = '🇬🇧';
    text = 'English';
  } else if (currentLanguage === 'hi') {
    // Currently Hindi -> show English option
    flag = '🇬🇧';
    text = 'English';
  } else if (currentLanguage === 'tl') {
    // Currently Tagalog -> show English option
    flag = '🇬🇧';
    text = 'English';
  } else if (currentLanguage === 'en') {
    // Currently English -> show the local language option
    // Use targetLanguage if provided, otherwise default to Arabic
    const target = targetLanguage || 'ar';
    
    if (target === 'ar') {
      flag = '🇸🇦';
      text = 'العربية';
    } else if (target === 'hi') {
      flag = '🇮🇳';
      text = 'हिंदी';
    } else if (target === 'tl') {
      flag = '🇵🇭';
      text = 'Tagalog';
    } else {
      // Fallback to Arabic if target is unknown
      flag = '🇸🇦';
      text = 'العربية';
    }
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
