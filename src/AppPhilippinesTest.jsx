import { LanguageToggle } from './components/LanguageToggle.jsx'

function AppPhilippinesTest({ onChangeLanguage }) {
  return (
    <div>
      <LanguageToggle currentLanguage="tl" targetLanguage="en" onToggle={onChangeLanguage} />
      <h1>Philippines Test Version</h1>
      <p>This is a minimal test version</p>
    </div>
  )
}

export default AppPhilippinesTest
