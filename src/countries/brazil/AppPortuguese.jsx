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
import { AlertTriangle, Calculator, Info, X, ZoomIn, Pill, Flame, Shield, Clock, Users, CheckCircle, Linkedin, Share2 } from 'lucide-react'
import { LanguageToggle } from '@/components/LanguageToggle.jsx'
import { ShareModal } from '@/components/ShareModal.jsx'
import linkedinLogo from '@/assets/linkedin-logo.png'
import '@/App.css'

// Import country-specific medication data
import { medicationsBrasil } from '@/data/countries/medicationsBrasil.js'

function AppBrasilPortuguese({ onChangeLanguage, country = 'DEFAULT' }) {
  const [weight, setWeight] = useState('') // String for text input
  const [age, setAge] = useState('') // String for text input
  const [ageUnit, setAgeUnit] = useState('') // 'months' or 'years' - empty by default
  const [ageCategory, setAgeCategory] = useState('') // 'infant' (under 1) or 'child' (1+)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculator')
  const [enlargedImage, setEnlargedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [medicationType, setMedicationType] = useState('xarope') // 'xarope' or 'supositório'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  // Select medications based on country
  const medicationsData = medicationsBrasil
  const suppositoriesData = {
    paracetamol: medicationsBrasil.paracetamolSuppositories || [],
    diclofenac: medicationsBrasil.diclofenacSuppositories || [],
    dipirona: medicationsBrasil.dipironaSuppositories || []
  }

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
      setResult({ error: 'Por favor, insira um peso válido (1-100 kg)' })
      return
    }

    // Convert age to meses if needed
    const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDoses
    let maxSingleDose // Maximum single dose in mg

    if (selectedMedication.ingredient === 'Paracetamol') {
      dosagePerKg = 15 // 15mg/kg per dose for all paracetamol medications
      frequency = 'A cada 4-6 horas'
      maxDailyDoses = 5
      maxSingleDose = 500 // Maximum 500mg per dose
    } else if (selectedMedication.ingredient === 'Ibuprofen') {
      dosagePerKg = 10 // 5-10mg/kg per dose
      frequency = 'A cada 6-8 horas'
      maxDailyDoses = 3
      maxSingleDose = 400 // Maximum 400mg per dose
    } else if (selectedMedication.ingredient === 'Diclofenac') {
      // New diclofenac calculation logic based on weight ranges
      frequency = 'A cada 8-12 horas'
      maxDailyDoses = 2
      
      // Check age requirement (minimum 1 year)
      if (ageInMonths < 12) {
        setResult({ error: 'Diclofenac é adequado para crianças acima de um ano' })
        return
      }
      
      // Weight-based dosing for diclofenac suppositories
      if (selectedMedication.form === 'suppository') {
        let appropriateDose = 0
        if (weightNum >= 8 && weightNum <= 16) {
          appropriateDose = 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          appropriateDose = 25
        } else {
          setResult({ error: 'Diclofenac é adequado para pesos 8-25 kg only' })
          return
        }
        
        // Check if selected medication matches the appropriate dose
        if (selectedMedication.concentration !== appropriateDose) {
          setResult({ error: `Por favor, selecione Diclofenac supositório ${appropriateDose}mg apropriado para o peso do seu filho` })
          return
        }
        
        setResult({
          medication: selectedMedication,
          weight: weightNum,
          doseMg: selectedMedication.concentration,
          suppositories: 1,
          frequency,
          maxDailyDoses,
          isSuppository: true
        })
        return
      }
    }

    let totalDoseMg = weightNum * dosagePerKg

    // Apply maximum dose limit for paracetamol and ibuprofen
    if (maxSingleDose && totalDoseMg > maxSingleDose) {
      totalDoseMg = maxSingleDose
    }

    if (selectedMedication.form === 'suppository') {
      // For suppositories, always show one supositório
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
      // For xaropes, calculate volume needed
      let volumeNeeded = (totalDoseMg * selectedMedication.volume) / selectedMedication.concentration
      
      // Round DOWN to nearest 0.1ml for gotas, 0.5ml for xaropes (safety first)
      if (selectedMedication.form === 'drops') {
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
  const getAppropriateSuppositoriesForAge = (ageInMonths, weightNum) => {
    if (!weightNum) return []
    
    // Get all suppositories from the suppositories object
    const paracetamolSupps = suppositoriesData.paracetamol || []
    const diclofenacSupps = suppositoriesData.diclofenac || []
    
    const allSuppositories = [...paracetamolSupps, ...diclofenacSupps]
    
    return allSuppositories.filter(med => {
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
      
      // For diclofenac suppositories, use weight-based filtering with minimum age of 1 year
      if (med.ingredient === 'Diclofenac') {
        // Check minimum age (12 meses = 1 year)
        if (ageInMonths < 12) return false
        
        // New diclofenac calculation logic:
        // Weight 8-16 kg: 12.5mg dose
        // Weight 17-25 kg: 25mg dose
        if (weightNum >= 8 && weightNum <= 16) {
          return med.concentration === 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          return med.concentration === 25
        }
        
        return false
      }
      
      // Default return false for unknown medication types
      return false
    })
  }

  const MedicationCard = ({ medication, category }) => {
    // Check if medication is Ibuprofen and age is under 6 meses
    const isIbuprofen = medication.ingredient === 'Ibuprofen'
    const ageInMonths = ageUnit === 'years' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if medication is Adol Drops and age is 2 anos or above
    const isAdolDrops = medication.id === 'adol_gotas'
    const is2YearsOrAbove = age && ageUnit === 'years' && parseFloat(age) >= 2
    
    // Check if supositório is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
    // Diclofenac requires age >= 1 year, grey out ONLY if age is selected AND age < 1
    const isDiclofenac = medication.ingredient === 'Diclofenac'
    if (isDiclofenac && age && ageUnit && ageInMonths < 12) {
      isSuppositoryUnsuitable = true
      unsuitabilityReason = 'Adequado para crianças acima de 1 ano'
    }
    
    if (medication.form === 'suppository' && age && ageUnit && weight) {
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
              unsuitabilityReason = `Adequado para peso ${weightRange} kg`
            }
          }
        }
      }
      
      if (medication.ingredient === 'Diclofenac') {
        if (ageInMonths < 12) {
          isSuppositoryUnsuitable = true
          unsuitabilityReason = 'Adequado para crianças acima de 1 ano'
        } else {
          if (weightNum >= 8 && weightNum <= 16) {
            if (medication.concentration !== 12.5) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (25mg), not the unsuitable one
              unsuitabilityReason = 'Adequado para peso 17-25 kg'
            }
          } else if (weightNum >= 17 && weightNum <= 25) {
            if (medication.concentration !== 25) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (12.5mg), not the unsuitable one
              unsuitabilityReason = 'Adequado para peso 8-16 kg'
            }
          } else {
            isSuppositoryUnsuitable = true
            // Show specific range based on concentration
            if (medication.concentration === 12.5) {
              unsuitabilityReason = 'Adequado para peso 8-16 kg'
            } else if (medication.concentration === 25) {
              unsuitabilityReason = 'Adequado para peso 17-25 kg'
            } else {
              unsuitabilityReason = 'Adequado para peso 8-25 kg'
            }
          }
        }
      }
    }
    
    const isDisabled = (isIbuprofen && isUnder6Months) || isSuppositoryUnsuitable || (isAdolDrops && is2YearsOrAbove)

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ Por favor, insira a idade e o peso primeiro')
        return
      }
      
      if (isSuppositoryUnsuitable) {
        alert(`⚠️ Aviso: Este supositório não é adequado para seu filho\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Months) {
        alert('⚠️ Aviso: Medicamentos de ibuprofeno são adequados para crianças de 6 meses ou mais')
        return
      }
      
      if (isAdolDrops && is2YearsOrAbove) {
        alert('⚠️ Warning: Adol Drops are suitable for children under 2 anos old only')
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
        <div className="flex items-start gap-4">
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
              title="Click to Enlarge"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Ampliar</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.ingredient}</p>
            <div className="text-sm text-gray-500">
              <span>Concentração: </span>
              <span className="font-bold text-blue-600" dir="ltr">
                {medication.form === 'suppository' 
                  ? `${medication.concentration}mg`
                  : `${medication.concentration}mg/${medication.volume}ml`
                }
              </span>
              <span className="mr-2">{medication.form}</span>
            </div>
            {medication.ageRestriction && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                {medication.ageRestriction}
              </p>
            )}
            {(isIbuprofen && isUnder6Months) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ Para 6 meses ou mais
              </p>
            )}
            {(isAdolDrops && is2YearsOrAbove) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ Para crianças under 2 anos
              </p>
            )}
            {isSuppositoryUnsuitable && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ {unsuitabilityReason}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0">
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
              <span>Calcular Dose</span>
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
      
      
        <LanguageToggle currentLanguage="pt" targetLanguage="en" onToggle={onChangeLanguage} />
      
      {/* Share Button */}
      <button
        onClick={() => setIsShareModalOpen(true)}
        className="fixed top-4 right-4 z-50 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200"
        title="Compartilhar o site"
      >
        <Share2 className="w-5 h-5" />
        <span className="hidden sm:inline">Compartilhar</span>
      </button>
      
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
                <span className="text-red-600 text-4xl">Calculadora de Febre</span>
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
                Calculadora de Dose de Antitérmico e Analgésico para Crianças
              </h1>
            </div>
            <p className="text-gray-600 mb-3">
              Calcule a dose correta para seu filho baseado no peso e tipo de medicamento
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
              Calculator
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Informações Médicas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Informações da Criança
                </CardTitle>
                <CardDescription>
                  Insira a idade e peso da criança
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-1">
                      Qual é a idade do seu filho?
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={ageCategory === 'infant' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('infant')
                          setAgeUnit('months')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">👶</div>
                          <div>Menos de 1 ano</div>
                          <div className="text-xs opacity-70">(1-12 meses)</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={ageCategory === 'child' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('child')
                          setAgeUnit('years')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🧒</div>
                          <div>Mais de 1 ano</div>
                          <div className="text-xs opacity-70">(1-14 anos)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">
                        {ageCategory === 'infant' ? 'Selecione a idade em meses' : 'Selecione a idade em anos'}
                      </label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder={ageCategory === 'infant' ? 'Select meses' : 'Select anos'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
                            // 1-12 meses
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'month' : 'months'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 anos
                            Array.from({ length: 14 }, (_, i) => i + 1).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} {year === 1 ? 'year' : 'years'}
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
                      <label className="text-sm font-medium">Peso da Criança (kg)</label>
                      <Select value={weight} onValueChange={setWeight}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
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
                <h2 className="text-xl font-semibold">Selecione a forma do medicamento:</h2>
                
                {/* Medication Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={medicationType === 'xarope' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('xarope')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>Xarope</span>
                  </Button>
                  {/* Hide suppositories for Philippines - not available there */}
                  {country !== 'PH' && (
                    <Button
                      variant={medicationType === 'supositório' ? 'default' : 'outline'}
                      onClick={() => changeMedicationType('supositório')}
                      className="flex items-center gap-2 px-6 py-3"
                    >
                      <span>💊</span>
                      <span>Supositórios</span>
                    </Button>
                  )}
                </div>
              </div>

              {medicationType === 'xarope' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Medicamentos de Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medicationsData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Note about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        Se você tem um medicamento de Paracetamol e não o encontrou nas imagens acima, pode selecionar o medicamento com a mesma concentração e obterá a mesma dose necessária. Por exemplo, concentração 
                        {' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofen Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Medicamentos de Ibuprofeno</h3>
                      <Badge variant="outline" className="text-green-600">
                        Idade acima de 6 meses
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        Para febre ou dor que não responde ao paracetamol, seu médico pode recomendar um antitérmico ou analgésico mais forte como ibuprofeno, alternando com paracetamol a cada 4 horas se necessário
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Note:</strong> Ibuprofen does not interact with paracetamol and can be taken at the same time
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {medicationsData.ibuprofen.map(med => (
                        <MedicationCard key={med.id} medication={med} category="ibuprofen" />
                      ))}
                    </div>
                  </div>
                  )}
                </>
              )}
              {medicationType === 'supositório' && (
                <>
                  {/* Supositórios de Paracetamol Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Supositórios de Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositoriesData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Supositórios de Diclofenaco Section - Always show but disable for under 1 year */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Supositórios de Diclofenaco</h3>
                      <Badge variant="outline" className="text-green-600">
                        Para crianças acima de 1 ano
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        Para febre ou dor que não responde ao paracetamol, seu médico pode recomendar um antitérmico ou analgésico mais forte como supositórios de diclofenaco
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Nota:</strong> Supositórios de diclofenaco não interagem com paracetamol, mas pertencem à mesma família que ibuprofeno xarope. Não tome ao mesmo tempo e deixe 8 horas entre eles
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {suppositoriesData.diclofenac.map(med => (
                        <MedicationCard key={med.id} medication={med} category="diclofenac_supp" />
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
                  Calcular Dose
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
                <CardTitle>Resultado do Cálculo</CardTitle>
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
                        <h3 className="font-semibold text-green-800 mb-2">Dose Calculada:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSuppository ? (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Number of Suppositories:</strong> {result.suppositories} supositório
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Quantidade Necessária:</strong> {result.volume} ml
                            </p>
                          )}
                          <p><strong>Medicamento:</strong> {result.medication.name}</p>
                          <p><strong>Peso da Criança:</strong> {result.weight} kg</p>
                          <p><strong>Frequência:</strong> {result.frequency}</p>
                          <p><strong>Máximo Diário:</strong> {result.maxDailyDoses} doses</p>
                          {/* NSAIDs Warning for Ibuprofen and Diclofenac */}
                          {(result.medication.ingredient === 'Ibuprofen' || result.medication.ingredient === 'Diclofenac') && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-orange-800 text-sm font-medium">
                                Do not combine ibuprofen xarope and diclofenac suppositories at the same time; leave 8 hours between them
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                              Desenvolvido por{' '}
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
                          Para perguntas frequentes e explicações adicionais, clique aqui
                        </Button>
                      </div>
                      
                      {/* Warning Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong>Aviso Importante:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                              <li>Esta calculadora é apenas para orientação. Sempre consulte um médico antes de dar qualquer medicamento ao seu filho. Não exceda a dose recomendada e não dê medicamento por mais de 3-5 dias sem consulta médica.</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum
                                return ageUnit === 'months' && ageInMonths === 1 && (
                                  <li>Para bebês under one month with fever, it's best not to give fever reducers and go to the hospital for examination.</li>
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
                    Insira a idade e peso da criança e selecione o medicamento para calcular a dose
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
                    Guia Completo de Famílias de Medicamentos
                  </CardTitle>
                  <CardDescription>
                    Aprenda sobre diferentes tipos de medicamentos, como funcionam e marcas disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {/* Paracetamol Family */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">Família do Paracetamol (Acetaminofeno)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Marcas Populares
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            Available forms: <strong>suppositories, xarope, gotas</strong>
                          </div>
                          
                          {/* Note about same concentration */}
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              If you have a Paracetamol medication and didn't find it in the images, you can select the medication with the same concentration and you will get the same required dose. For example, concentration 
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
                          <span className="text-lg font-semibold">Ibuprofen & Diclofenac "NSAIDs" Family</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <Tabs defaultValue="ibuprofen" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ibuprofen">Ibuprofen</TabsTrigger>
                            <TabsTrigger value="diclofenac">Diclofenac</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="ibuprofen" className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Marcas Populares
                              </h4>
                              <div className="text-purple-800 text-sm mb-3">
                                Available forms: <strong>Xarope</strong>
                              </div>
                              <div className="grid gap-2 text-purple-800 text-sm">
                                <div>• Nurofen - Nurofen</div>
                                <div>• Brufen - Brufen</div>
                                <div>• Profinal - Profinal</div>
                                <div>• Sapofen - Sapofen</div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="diclofenac" className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Marcas Populares
                              </h4>
                              <div className="text-purple-800 text-sm mb-3">
                                Available forms: <strong>suppositories</strong>
                              </div>
                              <div className="grid gap-2 text-purple-800 text-sm">
                                <div>• Voltaren - Voltaren</div>
                                <div>• Rofenac - Rofenac</div>
                                <div>• Diclofen</div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Comparison and Usage Guidelines */}
                    <AccordionItem value="comparison">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-lg font-semibold">Drug Comparison and Usage Guidelines</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">Full Guide</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        {/* Comparison Table */}
                        <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-center text-sm md:text-base">Drug Comparison Table</h4>
                          
                          {/* Mobile Card View */}
                          <div className="md:hidden space-y-3">
                            {/* Paracetamol Card */}
                            <div className="bg-white border-2 border-blue-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-blue-700 mb-2 text-sm">Paracetamol</h5>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Minimum Age:</span>
                                  <span className="text-blue-700">2 meses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-blue-700">4-6 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Máximo Diário:</span>
                                  <span className="text-blue-700">5 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-blue-700">Drops, Syrup, suppositories</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Aviso Importante:</span>
                                  <span className="text-blue-700">-</span>
                                </div>
                              </div>
                            </div>

                            {/* Ibuprofen Card */}
                            <div className="bg-white border-2 border-red-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-red-700 mb-1 text-sm">Ibuprofen</h5>
                              <p className="text-center text-xs text-red-500 mb-2">NSAIDs</p>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Minimum Age:</span>
                                  <span className="text-red-700">6 meses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-red-700">6-8 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Máximo Diário:</span>
                                  <span className="text-red-700">3 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Mainly Syrup</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Aviso Importante:</span>
                                  <span className="text-red-700">Do not combine with Diclofenac</span>
                                </div>
                              </div>
                            </div>

                            {/* Diclofenac Card */}
                            <div className="bg-white border-2 border-red-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-red-700 mb-1 text-sm">Diclofenac</h5>
                              <p className="text-center text-xs text-red-500 mb-2">NSAIDs</p>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Minimum Age:</span>
                                  <span className="text-red-700">1 year</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-red-700">8-12 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Máximo Diário:</span>
                                  <span className="text-red-700">2 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Suppositories only</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Aviso Importante:</span>
                                  <span className="text-red-700">Do not combine with Ibuprofen</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Table View */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full text-sm border-collapse bg-white">
                              <thead>
                                <tr className="border-b border-gray-300">
                                  <th className="text-right p-3 font-semibold whitespace-nowrap">Property</th>
                                  <th className="text-center p-3 font-semibold text-blue-700 whitespace-nowrap">Paracetamol</th>
                                  <th className="text-center p-3 font-semibold text-red-700 whitespace-nowrap">
                                    Ibuprofen
                                    <div className="text-xs text-red-500 mt-1">NSAIDs</div>
                                  </th>
                                  <th className="text-center p-3 font-semibold text-red-700 whitespace-nowrap">
                                    Diclofenac
                                    <div className="text-xs text-red-500 mt-1">NSAIDs</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Minimum Age</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">2 meses</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 meses</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">1 year</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Duration of Effect</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">4-6 hours</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6-8 hours</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">8-12 hours</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Maximum Daily Doses</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">5 doses</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">3 doses</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">2 doses</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Available Forms</td>
                                  <td className="p-3 text-center text-blue-700">Drops, Syrup, suppositories</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Mainly Syrup</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Suppositories only</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Aviso Importante</td>
                                  <td className="p-3 text-center text-blue-700">-</td>
                                  <td className="p-3 text-center text-red-700 text-xs">Do not combine with Diclofenac</td>
                                  <td className="p-3 text-center text-red-700 text-xs">Do not combine with Ibuprofen</td>
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
                    Frequently Asked Questions About Fever Reducers for Children
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Answers to the most common questions about using fever reducers for children
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
                            Qual é a diferença entre medicamentos de paracetamol e medicamentos de (ibuprofeno e diclofenaco)?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-blue-800 text-sm md:text-base">
                            Ambos são antitérmicos e analgésicos. No entanto, (ibuprofeno e diclofenaco) são considerados mais fortes na redução de febre e dor do que a família do paracetamol.
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
                            Existe interação entre medicamentos de paracetamol e (ibuprofeno e diclofenaco)?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-green-800">
                            There is no interaction between them, and they can be taken at the same time, but your doctor may recommend a specific time between them, such as every 4 hours between paracetamol and ibuprofen, so you can give medications throughout the day.
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
                            Quais medicamentos não devem ser combinados ao mesmo tempo?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-orange-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-orange-800 space-y-2">
                            <p>
                              <strong className="text-red-600">Do not combine medications containing Paracetamol</strong> at the same time - there must be 4-6 hours between them.
                            </p>
                            <p>
                              <strong className="text-red-600">And do not combine medications containing Ibuprofen (Brufen) or Diclofenac</strong> at the same time - there must be 8 hours between them.
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
                            Os medicamentos devem ser tomados após comer ou com o estômago vazio?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">Medicamentos de Paracetamol</strong> can be taken on an empty stomach.
                            </p>
                            <p>
                              <strong className="text-red-600">Ibuprofen (Brufen) medications</strong> are preferably taken after food or a light meal.
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
                  <strong className="block mb-2">Avisos Importantes de Segurança:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                    <li>Nunca exceda a dose recomendada ou frequência permitida</li>
                    <li>Não dê mais de um tipo de medicamento contendo o mesmo princípio ativo</li>
                    <li>Não use medicamento por mais de 3-5 dias sem consulta médica</li>
                    <li>Certifique-se de que não há alergia ao medicamento antes de usar</li>
                    <li>Mantenha todos os medicamentos fora do alcance das crianças</li>
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
                        title="الImage السابقة"
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
                        title="الImage التالية"
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
                    {enlargedImage.form === 'suppository' 
                      ? `${enlargedImage.concentration}mg`
                      : `${enlargedImage.concentration}mg/${enlargedImage.volume}ml`
                    } {enlargedImage.form}
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
                Desenvolvido por{' '}
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
              <p className="font-semibold text-gray-700">Calculadora de Febre</p>
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
        <p className="text-gray-500 text-lg mb-2">لم يتم تسجيل أي doses بعد</p>
        <p className="text-gray-400 text-sm">
          استخدم زر "سجل الdose الآن" بعد حساب الdose لبدء التتبع
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
                  <div className="text-sm text-gray-500">آخر dose</div>
                  <div className="text-sm font-medium">
                    {new Date(lastDose.time).toLocaleTimeString('ar-SA', { 
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
                    Today's Doses: {dosesIn24h}
                  </div>
                  
                  {canTakeNext && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Bell className="h-3 w-3 mr-1" />
                        Ready for Next Dose
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

      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)}
        language="pt"
      />
    </div>
  )
}

export default AppBrasilPortuguese

