import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog.jsx'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion.jsx'
import { AlertTriangle, Calculator, Info, X, ZoomIn, Pill, Flame, Shield, Clock, Users, CheckCircle, Linkedin } from 'lucide-react'
import { LanguageToggle } from '@/components/LanguageToggle.jsx'
import linkedinLogo from '@/assets/linkedin-logo.png'
import '@/App.css'

// Import country-specific medication data
import { medicationsMexico } from '@/data/countries/medicationsMexico.js'

// Use Mexican medications database
const medications = { paracetamol: medicationsMexico.paracetamol, ibuprofen: medicationsMexico.ibuprofen };
const suppositories = medicationsMexico.suppositories;

function App({ onChangeLanguage }) {
  const [weight, setWeight] = useState('') // String for text input
  const [age, setAge] = useState('') // String for text input
  const [ageUnit, setAgeUnit] = useState('') // 'meses' or 'años' - empty by default
  const [ageCategory, setAgeCategory] = useState('') // 'bebé' (under 1) or 'niño' (1+)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculator')
  const [enlargedImage, setEnlargedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [medicationType, setMedicationType] = useState('jarabe') // 'jarabe' or 'supositorio'

  // Select medications based on country
  const medicationsData = medications
  const suppositoriesData = suppositories

  // Function to convert Arabic numerals to English numerals
  const convertArabicToEnglish = (str) => {
    if (!str) return str
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    
    let result = str.toString()
    for (let i = 0; i < arabicNumbers.length; i++) {
      result = result.replace(new RegExp(arabicNumbers[i], 'g'), englishNumbers[i])
    }
    return result
  }

  const calculateDosage = () => {
    if (!weight || !age || !ageUnit || !selectedMedication) {
      return
    }

    // Convert Arabic numerals to English
    const weightStr = convertArabicToEnglish(weight)
    const ageStr = convertArabicToEnglish(age)

    const weightNum = parseFloat(weightStr)
    const ageNum = parseFloat(ageStr)
    
    if (weightNum <= 0 || weightNum > 100) {
      setResult({ error: 'Por favor ingrese un peso válido (1-100 kg)' })
      return
    }

    // Convert age to months if needed
    const ageInMonths = ageUnit === 'años' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDoses
    let maxSingleDose // Maximum single dose in mg

    if (selectedMedication.ingredient === 'Paracetamol') {
      dosagePerKg = 15 // 10-15mg/kg per dose
      frequency = 'Cada 4-6 horas'
      maxDailyDoses = 5
      maxSingleDose = 500 // Maximum 500mg per dose
    } else if (selectedMedication.ingredient === 'Ibuprofeno') {
      dosagePerKg = 10 // 5-10mg/kg per dose
      frequency = 'Cada 6-8 horas'
      maxDailyDoses = 3
      maxSingleDose = 400 // Maximum 400mg per dose
    }

    let totalDoseMg = weightNum * dosagePerKg

    // Apply maximum dose limit for paracetamol and ibuprofen
    if (maxSingleDose && totalDoseMg > maxSingleDose) {
      totalDoseMg = maxSingleDose
    }

    if (selectedMedication.form === 'supositorio') {
      // For suppositories, always show one supositorio
      setResult({
        medication: selectedMedication,
        weight: weightNum,
        doseMg: selectedMedication.concentration,
        suppositories: 1,
        frequency,
        maxDailyDoses,
        isSuppository: true
      })
    } else {
      // For syrups, calculate volume needed
      let volumeNeeded = (totalDoseMg * selectedMedication.volume) / selectedMedication.concentration
      
      // Round DOWN to nearest 0.1ml for drops, 0.5ml for syrups (safety first)
      if (selectedMedication.form === 'Gotas') {
        volumeNeeded = Math.floor(volumeNeeded * 10) / 10  // Round down to 0.1ml
      } else {
        volumeNeeded = Math.floor(volumeNeeded * 2) / 2    // Round down to 0.5ml
      }

      setResult({
        medication: selectedMedication,
        weight: weightNum,
        doseMg: totalDoseMg,
        volume: volumeNeeded,
        frequency,
        maxDailyDoses,
        isSuppository: false
      })
    }
  }

  const resetForm = () => {
    setWeight('')
    setAge('')
    setAgeUnit('')
    setSelectedMedication(null)
    setResult(null)
  }

  const changeMedicationType = (type) => {
    setMedicationType(type)
    setSelectedMedication(null)
    setResult(null)
  }

  // Function to filter appropriate suppositories based on age and weight
  const getAppropriateSupositoriosForAge = (ageInMonths, weightNum) => {
    if (!weightNum) return []
    
    // Get all suppositories from the suppositories object
    const paracetamolSupps = suppositoriesData.paracetamol || []
    
    const allSupositorios = [...paracetamolSupps]
    
    return allSupositorios.filter(med => {
      // For paracetamol suppositories, use weight-based filtering only
      if (med.ingredient === 'Paracetamol') {
        const weightRange = med.weightRange
        let minWeight = 0, maxWeight = 999
        if (weightRange) {
          // Handle decimal weights like 7-12.9
          const weightMatch = weightRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/)
          if (weightMatch) {
            minWeight = parseFloat(weightMatch[1])
            maxWeight = parseFloat(weightMatch[2])
          }
        }
        return weightNum >= minWeight && weightNum <= maxWeight
      }
      

      
      // Default return false for unknown medication types
      return false
    })
  }

  const MedicationCard = ({ medication, category }) => {
    // Check if medication is Ibuprofeno and age is under 6 months
    const isIbuprofeno = medication.ingredient === 'Ibuprofeno'
    const ageInMonths = ageUnit === 'años' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if medication is Adol Gotas and age is 2 years or above
    const isAdolGotas = medication.id === 'adol_drops'
    const is2YearsOrAbove = age && ageUnit === 'años' && parseFloat(age) >= 2
    
    // Check if supositorio is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
    if (medication.form === 'supositorio' && age && ageUnit && weight) {
      const weightNum = parseFloat(weight)
      
      if (medication.ingredient === 'Paracetamol') {
        const weightRange = medication.weightRange
        if (weightRange) {
          const weightMatch = weightRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/)
          if (weightMatch) {
            const minWeight = parseFloat(weightMatch[1])
            const maxWeight = parseFloat(weightMatch[2])
            if (weightNum < minWeight || weightNum > maxWeight) {
              isSuppositoryUnsuitable = true
              unsuitabilityReason = `Suitable for weight ${weightRange} kg`
            }
          }
        }
      }
      

    }
    
    const isDisabled = (isIbuprofeno && isUnder6Months) || isSuppositoryUnsuitable || (isAdolGotas && is2YearsOrAbove)

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ Por favor ingrese edad y peso primero')
        return
      }
      
      if (isSuppositoryUnsuitable) {
        alert(`⚠️ Advertencia: Este supositorio no es adecuado para su hijo\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofeno && isUnder6Months) {
        alert('⚠️ Advertencia: Los medicamentos de Ibuprofeno son adecuados solo para niños de 6 meses en adelante')
        return
      }
      
      if (isAdolGotas && is2YearsOrAbove) {
        alert('⚠️ Advertencia: Adol Gotas son adecuadas solo para niños menores de 2 años')
        return
      }
      setSelectedMedication(medication)
    }

    return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selectedMedication?.id === medication.id 
          ? 'ring-2 ring-blue-500 bg-blue-50' 
          : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
      style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {medication.images ? (
              <div className="flex gap-1">
                {medication.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${medication.name} ${index + 1}`}
                    className="w-8 h-16 object-contain rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <img 
                src={medication.image} 
                alt={medication.name}
                className="w-16 h-16 object-contain rounded-lg"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEnlargedImage(medication)
                setCurrentImageIndex(0)
              }}
              className="flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200"
              title="Clic para Ampliar"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Enlarge</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.ingredient}</p>
            <div className="text-sm text-gray-500">
              <span>Concentración: </span>
              <span className="font-bold text-blue-600" dir="ltr">
                {medication.form === 'supositorio' 
                  ? `${medication.concentration}mg`
                  : medication.packageConcentration
                    ? `${medication.packageConcentration} (${medication.concentration}mg/${medication.volume}ml)`
                    : `${medication.concentration}mg/${medication.volume}ml`
                }
              </span>
              {medication.form !== 'supositorio' && (
                <span className="mr-2">{medication.form}</span>
              )}
            </div>
            {medication.ageRestriction && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                {medication.ageRestriction}
              </p>
            )}
            {(isIbuprofeno && isUnder6Months) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ Para 6 meses en adelante
              </p>
            )}
            {(isAdolGotas && is2YearsOrAbove) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ Para niños menores de 2 años
              </p>
            )}
            {isSuppositoryUnsuitable && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ {unsuitabilityReason}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300">
              {selectedMedication?.id === medication.id && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
        {selectedMedication?.id === medication.id && weight && age && ageUnit && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation()
                calculateDosage()
                // Scroll to results section with slower, smoother animation
                setTimeout(() => {
                  const resultsSection = document.getElementById('results-section')
                  if (resultsSection) {
                    // Simple scroll: position results just below sticky header with some padding
                    const stickyHeaderHeight = 88
                    const resultsTop = resultsSection.getBoundingClientRect().top + window.pageYOffset
                    // Reduced offset to make scroll go further down (match Arabic version)
                    const targetPosition = resultsTop - stickyHeaderHeight + 30
                    const startPosition = window.pageYOffset
                    const distance = targetPosition - startPosition
                    const duration = 3000 // 3 seconds for optimal slow, smooth scroll
                    let start = null

                    // Custom easing function for smooth animation
                    const easeInOutCubic = (t) => {
                      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                    }

                    const animation = (currentTime) => {
                      if (start === null) start = currentTime
                      const timeElapsed = currentTime - start
                      const progress = Math.min(timeElapsed / duration, 1)
                      const ease = easeInOutCubic(progress)
                      
                      window.scrollTo(0, startPosition + distance * ease)
                      
                      if (timeElapsed < duration) {
                        requestAnimationFrame(animation)
                      }
                    }

                    requestAnimationFrame(animation)
                  }
                }, 300)
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-200"
            >
              <span>Calcular Dosis</span>
              <span>💊</span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hide language toggle for Philippines - English only until Tagalog translation is ready */}
      { (
        <LanguageToggle currentLanguage="es" targetLanguage="en" onToggle={onChangeLanguage} />
      )}
      {/* Top Brand Header */}
      <div className="sticky top-0 bg-white text-gray-800 py-6 shadow-lg border-b-2 border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4">
            {/* Icon Container */}
            <div className="bg-red-100 rounded-2xl p-3 shadow-md border border-red-200">
              <span className="text-4xl">🌡️</span>
            </div>
            
            {/* Text Container */}
            <div className="text-center">
              <h1 className="font-bold text-3xl tracking-wide">
                <span className="text-red-600 text-4xl">Calculadora de Fiebre</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Calculadora de Dosis de Medicamentos Antifebriles y Analgésicos para Niños
              </h1>
            </div>
            <p className="text-gray-600 mb-3">
              Calcule la dosis correcta para su hijo según el peso y el tipo de medicamento
            </p>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Información Médica
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Información del Niño
                </CardTitle>
                <CardDescription>
                  Ingrese edad y peso del niño
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-1">
                      ¿Qué edad tiene su hijo?
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={ageCategory === 'bebé' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('bebé')
                          setAgeUnit('meses')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">👶</div>
                          <div>Menos de 1 año</div>
                          <div className="text-xs opacity-70">(1-12 months)</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={ageCategory === 'niño' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('niño')
                          setAgeUnit('años')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🧒</div>
                          <div>Más de 1 año</div>
                          <div className="text-xs opacity-70">(1-14 years)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">
                        {ageCategory === 'bebé' ? 'Seleccione edad en meses' : 'Seleccione edad en años'}
                      </label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder={ageCategory === 'bebé' ? 'Seleccione meses' : 'Seleccione años'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'bebé' ? (
                            // 1-12 months
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'mes' : 'meses'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 years
                            Array.from({ length: 14 }, (_, i) => i + 1).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} {year === 1 ? 'año' : 'años'}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Step 3: Weight Selection */}
                  {age && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">Peso del Niño (kg)</label>
                      <Select value={weight} onValueChange={setWeight}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Seleccione peso" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'bebé' ? (
                            // Infant (< 1 year): 3-16 kg, every 0.5 kg
                            Array.from({ length: 27 }, (_, i) => 3 + (i * 0.5)).map(w => (
                              <SelectItem key={w} value={w.toString()}>
                                {w} kg
                              </SelectItem>
                            ))
                          ) : (
                            // Child (> 1 year): 6-60 kg
                            <>
                              {/* 6-15 kg: Every 0.5 kg */}
                              {Array.from({ length: 19 }, (_, i) => 6 + (i * 0.5)).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} kg
                                </SelectItem>
                              ))}
                              {/* 16-30 kg: Every 1 kg */}
                              {Array.from({ length: 15 }, (_, i) => i + 16).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} kg
                                </SelectItem>
                              ))}
                              {/* 31-60 kg: Every 1 kg */}
                              {Array.from({ length: 30 }, (_, i) => 31 + i).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} kg
                                </SelectItem>
                              ))}
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Medication Selection */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Seleccione forma de medicamento:</h2>
                
                {/* Medication Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={medicationType === 'jarabe' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('jarabe')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>Jarabe</span>
                  </Button>
                  {/* Hide suppositories for Philippines - not available there */}
                  { (
                    <Button
                      variant={medicationType === 'supositorio' ? 'default' : 'outline'}
                      onClick={() => changeMedicationType('supositorio')}
                      className="flex items-center gap-2 px-6 py-3"
                    >
                      <span>💊</span>
                      <span>Supositorios</span>
                    </Button>
                  )}
                </div>
              </div>

              {medicationType === 'jarabe' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Paracetamol medications</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medicationsData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Note about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        Si tiene un medicamento de Paracetamol y no lo encontró en las imágenes anteriores, puede seleccionar el medicamento con la misma concentración y obtendrá la misma dosis requerida. Por ejemplo, concentración 
                        {' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofeno Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Medicamentos de Ibuprofeno</h3>
                      <Badge variant="outline" className="text-green-600">
                        Edad mayor a 6 meses
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        Para fiebre o dolor que no responde al paracetamol, su médico puede recomendar un reductor de fiebre o analgésico más fuerte como el ibuprofeno, alternando con paracetamol cada 4 horas si es necesario
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Nota:</strong> El ibuprofeno no interactúa con el paracetamol y se puede tomar al mismo tiempo
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {medicationsData.ibuprofen.map(med => (
                        <MedicationCard key={med.id} medication={med} category="ibuprofen" />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {medicationType === 'supositorio' && (
                <>
                  {/* Supositorios de Paracetamol Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Supositorios de Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositoriesData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  

                </>
              )}
            </div>

            {/* Action Buttons */}
            {!selectedMedication && (
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={calculateDosage}
                  disabled={!weight || !age || !ageUnit || !selectedMedication}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  Calcular Dosis
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Reset
                </Button>
              </div>
            )}
            {selectedMedication && (
              <div className="flex justify-center">
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Reset
                </Button>
              </div>
            )}

            {/* Results */}
            <Card id="results-section" className="transition-all duration-500">
              <CardHeader>
                <CardTitle>Resultado del Cálculo</CardTitle>
              </CardHeader>
              <CardContent>
                {result ? (
                  result.error ? (
                    <Alert className="bg-red-50 border-red-200">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800">
                        {result.error}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-semibold text-green-800 mb-2">Dosis Calculada:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSuppository ? (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Number of Supositorios:</strong> {result.suppositories} supositorio
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Cantidad Requerida:</strong> {result.volume} ml
                            </p>
                          )}
                          <p><strong>Medicamento:</strong> {result.medication.name}</p>
                          <p><strong>Peso del Niño:</strong> {result.weight} kg</p>
                          <p><strong>Frecuencia:</strong> {result.frequency}</p>
                          <p><strong>Máximo Diario:</strong> {result.maxDailyDoses} dosis</p>
                          {/* NSAIDs Warning for Ibuprofeno */}
                          {result.medication.ingredient === 'Ibuprofeno' && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-orange-800 text-sm font-medium">
                                Ibuprofeno es un medicamento antiinflamatorio. Consulte a su médico antes de combinarlo con otros medicamentos.
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                              Desarrollado por{' '}
                              <a 
                                href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                              >
                                Dr. Saad Fahad Almodameg
                              </a>
                              {' '}
                              <a 
                                href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1"
                              >
                                <img src={linkedinLogo} alt="LinkedIn" className="h-3" />
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                      
                                   {/* FAQ Button */}
                      <div className="flex justify-center mt-4">
                        <Button
                          onClick={() => {
                            setActiveTab('info')
                            setTimeout(() => {
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }, 100)
                          }}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-200">
                          <Info className="h-4 w-4 ml-2" />
                          Para preguntas frecuentes y explicación adicional, haga clic aquí
                        </Button>
                      </div>
                      
                      {/* Warning Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong>Advertencia Importante:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                              <li>Esta calculadora es solo para orientación. Siempre consulte a un médico antes de administrar cualquier medicamento a su hijo. No exceda la dosis recomendada y no administre medicamentos por más de 3-5 días sin consulta médica.</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInMonths = ageUnit === 'años' ? ageNum * 12 : ageNum
                                return ageUnit === 'meses' && ageInMonths === 1 && (
                                  <li>Para bebés menores de un mes con fiebre, es mejor no administrar reductores de fiebre e ir al hospital para examen.</li>
                                )
                              })()}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  )
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Ingrese edad y peso del niño y seleccione el medicamento para calcular la dosis
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="info" className="space-y-6">
            <div className="grid gap-6">
              {/* Drug Families Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Guía Completa de Familias de Medicamentos
                  </CardTitle>
                  <CardDescription>
                    Conozca los diferentes tipos de medicamentos, cómo funcionan y las marcas disponibles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {/* Paracetamol Family */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">Familia del Paracetamol (Acetaminofén)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Popular Brand Names
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            Formas disponibles: <strong>suppositories, syrup, drops</strong>
                          </div>
                          
                          {/* Note about same concentration */}
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              Si tiene un medicamento de Paracetamol y no lo encontró en las imágenes, puede seleccionar el medicamento con la misma concentración y obtendrá la misma dosis requerida. Por ejemplo, concentración 
                              {' '}
                              <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                            </p>
                          </div>
                          <div className="grid gap-2 text-purple-800 text-sm">
                            <div>• Pediamol</div>
                            <div>• Emidol</div>
                            <div>• Omol</div>
                            <div>• Defadol - Defadol</div>
                            <div>• Fevadol - Fevadol</div>
                            <div>• Calpol</div>
                            <div>• Panadol - Panadol</div>
                            <div>• Revani</div>
                            <div>• Panadrex</div>
                            <div>• Adol - Adol</div>
                            <div>• Tylenol - Tylenol</div>
                            <div>• Cetal</div>
                            <div>• Tempra</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* NSAIDs Family */}
                    <AccordionItem value="nsaids">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Flame className="h-5 w-5 text-red-600" />
                          <span className="text-lg font-semibold">Ibuprofeno "NSAIDs" Family</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Marcas Populares de Ibuprofeno
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            Formas disponibles: <strong>Jarabe, Suspensión, Gotas</strong>
                          </div>
                          <div className="grid gap-2 text-purple-800 text-sm">
                            <div>• Motrin Infantil</div>
                            <div>• Motrin Pediátrico</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Comparison and Usage Guidelines */}
                    <AccordionItem value="comparison">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-lg font-semibold">Comparación de Medicamentos y Guías de Uso</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">Guía Completa</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        {/* Comparison Table */}
                        <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-center text-sm md:text-base">Tabla de Comparación de Medicamentos</h4>
                          
                          {/* Mobile Card View */}
                          <div className="md:hidden space-y-3">
                            {/* Paracetamol Card */}
                            <div className="bg-white border-2 border-blue-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-blue-700 mb-2 text-sm">Paracetamol</h5>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Edad Mínima:</span>
                                  <span className="text-blue-700">2 months</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duración del Efecto:</span>
                                  <span className="text-blue-700">4-6 horas</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Máximo Diario:</span>
                                  <span className="text-blue-700">5 dosis</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Formas Disponibles:</span>
                                  <span className="text-blue-700">Gotas, Jarabe, Supositorios</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Advertencia Importante:</span>
                                  <span className="text-blue-700">-</span>
                                </div>
                              </div>
                            </div>

                            {/* Ibuprofeno Card */}
                            <div className="bg-white border-2 border-red-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-red-700 mb-1 text-sm">Ibuprofeno</h5>
                              <p className="text-center text-xs text-red-500 mb-2">NSAIDs</p>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Edad Mínima:</span>
                                  <span className="text-red-700">6 meses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duración del Efecto:</span>
                                  <span className="text-red-700">6-8 horas</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Máximo Diario:</span>
                                  <span className="text-red-700">3 dosis</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Formas Disponibles:</span>
                                  <span className="text-red-700">Principalmente Jarabe</span>
                                </div>

                              </div>
                            </div>


                          </div>

                          {/* Desktop Table View */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full text-sm border-collapse bg-white">
                              <thead>
                                <tr className="border-b border-gray-300">
                                  <th className="text-right p-3 font-semibold whitespace-nowrap">Propiedad</th>
                                  <th className="text-center p-3 font-semibold text-blue-700 whitespace-nowrap">Paracetamol</th>
                                  <th className="text-center p-3 font-semibold text-red-700 whitespace-nowrap">
                                    Ibuprofeno
                                    <div className="text-xs text-red-500 mt-1">NSAIDs</div>
                                  </th>

                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Edad Mínima</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">2 months</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 months</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Duración del Efecto</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">4-6 horas</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6-8 horas</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Dosis Diarias Máximas</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">5 dosis</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">3 dosis</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Formas Disponibles</td>
                                  <td className="p-3 text-center text-blue-700">Gotas, Jarabe, Supositorios</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Principalmente Jarabe</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Advertencia Importante</td>
                                  <td className="p-3 text-center text-blue-700">-</td>
                                  <td className="p-3 text-center text-red-700 text-xs">Consulte al médico antes de combinar con otros medicamentos</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Info className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
                    Preguntas Frecuentes Sobre Medicamentos Antifebriles para Niños
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Respuestas a las preguntas más comunes sobre el uso de medicamentos antifebriles para niños
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 md:p-6">
                  <Accordion type="single" collapsible className="w-full">
                    
                    {/* Question 1 */}
                    <AccordionItem value="faq1" className="border border-blue-200 rounded-lg px-2 md:px-4 mb-3 md:mb-4">
                      <AccordionTrigger className="text-right hover:no-underline py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold text-xs md:text-sm">1</span>
                          </div>
                          <span className="text-blue-800 font-semibold text-sm md:text-lg">
                            ¿Cuál es la diferencia entre los medicamentos de paracetamol y los de ibuprofeno?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-blue-800 text-sm md:text-base">
                            Ambos son reductores de fiebre y analgésicos. Sin embargo, el ibuprofeno se considera más fuerte para reducir la fiebre y el dolor que el paracetamol.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Question 2 */}
                    <AccordionItem value="faq2" className="border border-green-200 rounded-lg px-2 md:px-4 mb-3 md:mb-4">
                      <AccordionTrigger className="text-right hover:no-underline py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-green-600 font-bold text-sm">2</span>
                          </div>
                          <span className="text-green-800 font-semibold text-sm md:text-lg">
                            ¿Existe interacción entre los medicamentos de paracetamol e ibuprofeno?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-green-800">
                            No existe interacción entre ellos y pueden tomarse al mismo tiempo, pero su médico puede recomendar un tiempo específico entre ellos, como cada 4 horas entre paracetamol e ibuprofeno, para que pueda administrar los medicamentos durante todo el día.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Question 3 */}
                    <AccordionItem value="faq3" className="border border-orange-200 rounded-lg px-2 md:px-4 mb-3 md:mb-4">
                      <AccordionTrigger className="text-right hover:no-underline py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-orange-600 font-bold text-sm">3</span>
                          </div>
                          <span className="text-orange-800 font-semibold text-sm md:text-lg">
                            ¿Qué medicamentos no deben combinarse al mismo tiempo?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-orange-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-orange-800 space-y-2">
                            <p>
                              <strong className="text-red-600">No combine medicamentos que contengan Paracetamol</strong> al mismo tiempo - debe haber 4-6 horas entre ellos.
                            </p>
                            <p>
                              <strong className="text-red-600">Consulte a su médico antes de combinar diferentes medicamentos para la fiebre.</strong>
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Question 4 */}
                    <AccordionItem value="faq4" className="border border-teal-200 rounded-lg px-2 md:px-4 mb-3 md:mb-4">
                      <AccordionTrigger className="text-right hover:no-underline py-3 md:py-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-6 h-6 md:w-8 md:h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-teal-600 font-bold text-sm">4</span>
                          </div>
                          <span className="text-teal-800 font-semibold text-sm md:text-lg">
                            ¿Los medicamentos deben tomarse después de comer o con el estómago vacío?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">Los medicamentos de Paracetamol</strong> pueden tomarse con el estómago vacío.
                            </p>
                            <p>
                              <strong className="text-red-600">Los medicamentos de Ibuprofeno (Motrin)</strong> se toman preferiblemente después de comer o con una comida ligera.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>

                </CardContent>
              </Card>

              {/* Safety Warnings */}
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong className="block mb-2">Advertencias Importantes de Seguridad:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                    <li>Nunca exceda la dosis recomendada o la frecuencia permitida</li>
                    <li>No administre más de un tipo de medicamento que contenga el mismo principio activo</li>
                    <li>No use el medicamento por más de 3-5 días sin consulta médica</li>
                    <li>Asegúrese de que no haya alergia al medicamento antes de usarlo</li>
                    <li>Mantenga todos los medicamentos fuera del alcance de los niños</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Enlargement Dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={() => setEnlargedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-right">
              {enlargedImage?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            {enlargedImage && (
              <>
                {/* Image Display Area */}
                <div className="relative w-full max-w-lg">
                  <img 
                    src={enlargedImage.images ? enlargedImage.images[currentImageIndex] : enlargedImage.image} 
                    alt={`${enlargedImage.name} - Image ${currentImageIndex + 1}`}
                    className="w-full max-h-96 object-contain rounded-lg shadow-lg"
                  />
                  
                  {/* Navigation Arrows - Only show if multiple images */}
                  {enlargedImage.images && enlargedImage.images.length > 1 && (
                    <>
                      {/* Previous Button */}
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === 0 ? enlargedImage.images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                        title="Imagen Anterior"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      
                      {/* Next Button */}
                      <button
                        onClick={() => setCurrentImageIndex(prev => 
                          prev === enlargedImage.images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                        title="Imagen Siguiente"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Image Counter - Only show if multiple images */}
                {enlargedImage.images && enlargedImage.images.length > 1 && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">
                        Image {currentImageIndex + 1} of {enlargedImage.images.length}
                      </span>
                      
                      {/* Dots Indicator */}
                      <div className="flex gap-1">
                        {enlargedImage.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    

                  </div>
                )}

                {/* Medication Info */}
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold">{enlargedImage.name}</h3>
                  <p className="text-gray-600">{enlargedImage.ingredient}</p>
                  <p className="text-gray-500">
                    <span className="font-bold text-blue-600">
                      {enlargedImage.form === 'supositorio' 
                        ? `${enlargedImage.concentration}mg`
                        : enlargedImage.packageConcentration
                          ? `${enlargedImage.packageConcentration} (${enlargedImage.concentration}mg/${enlargedImage.volume}ml)`
                          : `${enlargedImage.concentration}mg/${enlargedImage.volume}ml`
                      }
                    </span>
                    {enlargedImage.form !== 'supositorio' && (
                      <>{' '}{enlargedImage.form}</>
                    )}
                  </p>
                  {enlargedImage.ageRestriction && (
                    <p className="text-blue-600 font-medium text-sm">
                      {enlargedImage.ageRestriction}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-600">
          {/* Copyright Notice */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
            <div className="space-y-2">
              <p className="text-base font-semibold text-gray-800 flex items-center justify-center gap-1">
                Desarrollado por{' '}
                <a 
                  href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  Dr. Saad Fahad Almodameg
                </a>
                <a 
                  href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-4" />
                </a>
              </p>
              <p className="font-semibold text-gray-700">Calculadora de Fiebre</p>
              <div className="text-lg font-bold text-gray-800">© All Rights Reserved</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t pt-4">
            <p className="mt-1 font-medium">
              <span className="text-black">Contact: </span>
              <span className="text-blue-600">fever.calc@gmail.com</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Dosage Timeline Visualizer Component
const DosageTimelineVisualizer = ({ 
  doseHistory, 
  currentTime, 
  getLastDose, 
  getTimeUntilNextDose, 
  getProgressPercentage, 
  formatTimeRemaining, 
  getDosesInLast24Hours 
}) => {
  // Get unique medications from dose history
  const uniqueMedications = [...new Set(doseHistory.map(dose => dose.medicationId))]
    .map(id => doseHistory.find(dose => dose.medicationId === id))

  if (doseHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">No se han registrado dosis aún</p>
        <p className="text-gray-400 text-sm">
          Use el botón "Registrar Dosis Ahora" después de calcular la dosis para comenzar el seguimiento
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Active Medications */}
      <div className="grid gap-4">
        {uniqueMedications.map(medication => {
          const lastDose = getLastDose(medication.medicationId)
          const timeUntilNext = getTimeUntilNextDose(lastDose)
          const progress = getProgressPercentage(lastDose)
          const dosesIn24h = getDosesInLast24Hours(medication.medicationId)
          const canTakeNext = timeUntilNext === 0

          return (
            <div key={medication.medicationId} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{medication.medicationName}</h4>
                  <p className="text-sm text-gray-600">{medication.ingredient}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Última Dosis</div>
                  <div className="text-sm font-medium">
                    {new Date(lastDose.time).toLocaleTimeString('es-MX', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>

              {/* Progress Circle */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={canTakeNext ? "#10b981" : "#3b82f6"}
                      strokeWidth="2"
                      strokeDasharray={`${progress}, 100`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
                      {Math.round(progress)}%
                    </span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {canTakeNext ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                    <span className={`font-medium ${canTakeNext ? 'text-green-700' : 'text-blue-700'}`}>
                      {formatTimeRemaining(timeUntilNext)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Dosis de Hoy: {dosesIn24h}
                  </div>
                  
                  {canTakeNext && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Bell className="h-3 w-3 mr-1" />
                        Listo para la Próxima Dosis
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Dose Time */}
              {!canTakeNext && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm">
                      Next Dose in: {formatTimeRemaining(timeUntilNext)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Recent Dose History */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Dose Log
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {doseHistory
            .slice(-10)
            .reverse()
            .map(dose => (
              <div key={dose.id} className="flex items-center justify-between bg-white p-2 rounded border">
                <div>
                  <div className="font-medium text-sm">{dose.medicationName}</div>
                  <div className="text-xs text-gray-600">{dose.amount}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">
                    {new Date(dose.time).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-sm font-medium">
                    {new Date(dose.time).toLocaleTimeString('ar-SA', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Current Time Display */}
      <div className="text-center py-2 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-600">Hora Actual</div>
        <div className="text-lg font-semibold text-blue-800">
          {currentTime.toLocaleTimeString('es-MX', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>
    </div>
  )
}

export default App

