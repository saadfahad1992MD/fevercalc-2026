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
import { LanguageToggle } from './components/LanguageToggle.jsx'
import linkedinLogo from './assets/linkedin-logo.png'
import './App.css'

// Import country-specific medication data
import { medicationsPhilippines } from './data/medicationsPhilippines.js'

// Import Philippines medication images
import biogesicDropsImg from './assets/medications/philippines/biogesic_drops.webp'
import tempraDropsImg from './assets/medications/philippines/tempra_drops.jpg'
import tempra120Img from './assets/medications/philippines/tempra_120.png'
import tempraForte250Img from './assets/medications/philippines/tempra_forte_250.jpg'
import biogesic250Img from './assets/medications/philippines/biogesic_250.png'
import dolanFP100Img from './assets/medications/philippines/dolan_fp_100.jpg'
import dolanFPForte200Img from './assets/medications/philippines/dolan_fp_forte_200.png'
import advilSuspensionImg from './assets/medications/philippines/advil_suspension.png'

// No suppositories for Philippines version

// Use Philippines medications database
const medications = medicationsPhilippines;
const suppositories = medicationsPhilippines.suppositories;

// Old hardcoded data (not used anymore)
const oldMedications = {
  paracetamol: [
    {
      id: 'adol_patak',
      name: 'Adol Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Drops',
      image: adolDropsImg,
      ageRestriction: '2 taon and under'
    },
    {
      id: 'adol_syrup',
      name: 'Adol Syrup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: adolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'fevadol',
      name: 'Fevadol',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: fevadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-mother-child',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: panadolMotherChildImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-baby',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: panadolBabySuspensionImg,
      ageRestriction: ''
    },
    {
      id: 'defadol',
      name: 'Defadol',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: defadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-children',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 240, // mg per 5ml (Children's 5-12 taon)
      volume: 5, // ml
      form: 'Syrup',
      image: panadolImg,
      ageRestriction: 'Suitable from 5 taon old'
    }
  ],
  ibuprofen: [
    {
      id: 'nurofen',
      name: 'Nurofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: nurofenImg,
      ageRestriction: 'Edad na higit sa 6 na buwan'
    },
    {
      id: 'prof',
      name: 'Prof',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: brufenImg,
      ageRestriction: 'Edad na higit sa 6 na buwan'
    },
    {
      id: 'profinal',
      name: 'Profinal',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: profinalImg,
      ageRestriction: 'Edad na higit sa 6 na buwan'
    },
    {
      id: 'brufen2',
      name: 'Brufen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: brufen2Img,
      ageRestriction: 'Edad na higit sa 6 na buwan'
    },
    {
      id: 'sapofen',
      name: 'Sapofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: sapofenImg,
      ageRestriction: 'Edad na higit sa 6 na buwan'
    }
  ]
}

const oldSuppositories = {
  paracetamol: [
    // 100mg suppositories
    {
      id: 'fevadol_100_supp',
      name: 'Fevadol 100',
      ingredient: 'Paracetamol',
      concentration: 100,
      form: 'supositoryo',
      image: fevadol100SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 kg'
    },
    {
      id: 'tylenol_100_supp',
      name: 'Tylenol 100',
      ingredient: 'Paracetamol',
      concentration: 100,
      form: 'supositoryo',
      image: tylenol100SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 kg'
    },
    // 125mg suppositories
    {
      id: 'adol_125_supp',
      name: 'Adol 125',
      ingredient: 'Paracetamol',
      concentration: 125,
      form: 'supositoryo',
      image: adol125SuppImg,
      ageRestriction: '8-12.9',
      weightRange: '8-12.9 kg'
    },
    // 200mg suppositories
    {
      id: 'fevadol_200_supp',
      name: 'Fevadol 200',
      ingredient: 'Paracetamol',
      concentration: 200,
      form: 'supositoryo',
      image: fevadol200SuppImg,
      ageRestriction: '13-20',
      weightRange: '13-20 kg'
    },
    {
      id: 'tylenol_200_supp',
      name: 'Tylenol 200',
      ingredient: 'Paracetamol',
      concentration: 200,
      form: 'supositoryo',
      image: tylenol200SuppImg,
      ageRestriction: '13-20',
      weightRange: '13-20 kg'
    },
    // 250mg suppositories
    {
      id: 'adol_250_supp',
      name: 'Adol 250',
      ingredient: 'Paracetamol',
      concentration: 250,
      form: 'supositoryo',
      image: adol250SuppImg,
      ageRestriction: '15-22',
      weightRange: '15-22 kg'
    },
    // 350mg suppositories
    {
      id: 'fevadol_350_supp',
      name: 'Fevadol 350',
      ingredient: 'Paracetamol',
      concentration: 350,
      form: 'supositoryo',
      image: fevadol350SuppImg,
      ageRestriction: '23-35',
      weightRange: '23-35 kg'
    },
    {
      id: 'tylenol_350_supp',
      name: 'Tylenol 350',
      ingredient: 'Paracetamol',
      concentration: 350,
      form: 'supositoryo',
      image: tylenol350SuppImg,
      ageRestriction: '23-35',
      weightRange: '23-35 kg'
    }
  ],
  diclofenac: [
    // 12.5mg suppositories
    {
      id: 'rofenac_12_5_supp',
      name: 'Rofenac 12.5',
      ingredient: 'Diclofenac',
      concentration: 12.5,
      form: 'supositoryo',
      image: rofenac12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 kg'
    },
    {
      id: 'voltaren_12_5_supp',
      name: 'Voltaren 12.5',
      ingredient: 'Diclofenac',
      concentration: 12.5,
      form: 'supositoryo',
      image: voltaren12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 kg'
    },
    // 25mg suppositories
    {
      id: 'rofenac_25_supp',
      name: 'Rofenac 25',
      ingredient: 'Diclofenac',
      concentration: 25,
      form: 'supositoryo',
      image: rofenac25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    },
    {
      id: 'voltaren_25_supp',
      name: 'Voltaren 25',
      ingredient: 'Diclofenac',
      concentration: 25,
      form: 'supositoryo',
      image: voltaren25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    }
  ]
}
// End of old hardcoded data

function AppPhilippines({ onChangeLanguage }) {
  const [weight, setWeight] = useState('') // String for text input
  const [age, setAge] = useState('') // String for text input
  const [ageUnit, setAgeUnit] = useState('') // 'buwan' or 'taon' - empty by default
  const [ageCategory, setAgeCategory] = useState('') // 'infant' (under 1) or 'child' (1+)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculator')
  const [enlargedImage, setPalakihindImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [medicationType, setMedicationType] = useState('syrup') // 'syrup' or 'supositoryo'

  // Select medications based on country
  const medicationsData = country === 'PH' ? medicationsPhilippines : medications
  const suppositoriesData = country === 'PH' ? medicationsPhilippines.suppositories : suppositories

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
      setResult({ error: 'Mangyaring maglagay ng wastong timbang (1-100 kg)' })
      return
    }

    // Convert age to buwan if needed
    const ageInMonths = ageUnit === 'taon' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDoses
    let maxSingleDose // Maximum single dose in mg

    if (selectedMedication.ingredient === 'Paracetamol') {
      dosagePerKg = 15 // 10-15mg/kg per dose
      frequency = 'Bawat 4-6 oras'
      maxDailyDoses = 5
      maxSingleDose = 500 // Maximum 500mg per dose
    } else if (selectedMedication.ingredient === 'Ibuprofen') {
      dosagePerKg = 10 // 5-10mg/kg per dose
      frequency = 'Bawat 6-8 oras'
      maxDailyDoses = 3
      maxSingleDose = 400 // Maximum 400mg per dose
    } else if (selectedMedication.ingredient === 'Diclofenac') {
      // New diclofenac calculation logic based on weight ranges
      frequency = 'Bawat 8-12 oras'
      maxDailyDoses = 2
      
      // Check age requirement (minimum 1 year)
      if (ageInMonths < 12) {
        setResult({ error: 'Ang Diclofenac ay angkop para sa mga batang may edad na isang taon pataas' })
        return
      }
      
      // Weight-based dosing for diclofenac suppositories
      if (selectedMedication.form === 'supositoryo') {
        let appropriateDose = 0
        if (weightNum >= 8 && weightNum <= 16) {
          appropriateDose = 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          appropriateDose = 25
        } else {
          setResult({ error: 'Ang Diclofenac ay angkop lamang para sa timbang na 8-25 kg' })
          return
        }
        
        // Check if selected medication matches the appropriate dose
        if (selectedMedication.concentration !== appropriateDose) {
          setResult({ error: `Please select Diclofenac supositoryo ${appropriateDose}mg appropriate for your child's weight` })
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

    if (selectedMedication.form === 'supositoryo') {
      // For suppositories, always show one supositoryo
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
      
      // Round DOWN to nearest 0.1ml for patak, 0.5ml for syrups (safety first)
      if (selectedMedication.form === 'Drops') {
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
  const getAppropriateSupositoryoForAge = (ageInMonths, weightNum) => {
    if (!weightNum) return []
    
    // Get all suppositories from the suppositories object
    const paracetamolSupps = suppositoriesData.paracetamol || []
    const diclofenacSupps = suppositoriesData.diclofenac || []
    
    const allSupositoryo = [...paracetamolSupps, ...diclofenacSupps]
    
    return allSupositoryo.filter(med => {
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
        // Check minimum age (12 buwan = 1 year)
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
    // Check if medication is Ibuprofen and age is under 6 buwan
    const isIbuprofen = medication.ingredient === 'Ibuprofen'
    const ageInMonths = ageUnit === 'taon' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if medication is Adol Drops and age is 2 taon or above
    const isAdolDrops = medication.id === 'adol_patak'
    const is2YearsOrAbove = age && ageUnit === 'taon' && parseFloat(age) >= 2
    
    // Check if supositoryo is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
    if (medication.form === 'supositoryo' && age && ageUnit && weight) {
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
      
      if (medication.ingredient === 'Diclofenac') {
        if (ageInMonths < 12) {
          isSuppositoryUnsuitable = true
          unsuitabilityReason = 'Suitable for children over 1 year old'
        } else {
          if (weightNum >= 8 && weightNum <= 16) {
            if (medication.concentration !== 12.5) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (25mg), not the unsuitable one
              unsuitabilityReason = 'Suitable for weight 17-25 kg'
            }
          } else if (weightNum >= 17 && weightNum <= 25) {
            if (medication.concentration !== 25) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (12.5mg), not the unsuitable one
              unsuitabilityReason = 'Suitable for weight 8-16 kg'
            }
          } else {
            isSuppositoryUnsuitable = true
            // Show specific range based on concentration
            if (medication.concentration === 12.5) {
              unsuitabilityReason = 'Suitable for weight 8-16 kg'
            } else if (medication.concentration === 25) {
              unsuitabilityReason = 'Suitable for weight 17-25 kg'
            } else {
              unsuitabilityReason = 'Suitable for weight 8-25 kg'
            }
          }
        }
      }
    }
    
    const isDisabled = (isIbuprofen && isUnder6Months) || isSuppositoryUnsuitable || (isAdolDrops && is2YearsOrAbove)

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ Please enter age and weight first')
        return
      }
      
      if (isSuppositoryUnsuitable) {
        alert(`⚠️ Warning: This supositoryo is not suitable for your child\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Months) {
        alert('⚠️ Warning: Mga gamot na Ibuprofen are suitable for children 6 buwan and older only')
        return
      }
      
      if (isAdolDrops && is2YearsOrAbove) {
        alert('⚠️ Warning: Adol Drops are suitable for children under 2 taon old only')
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
                setPalakihindImage(medication)
                setCurrentImageIndex(0)
              }}
              className="flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200"
              title="Click to Palakihin"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Palakihin</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.ingredient}</p>
            <div className="text-sm text-gray-500">
              <span>Konsentrasyon: </span>
              <span className="font-bold text-blue-600" dir="ltr">
                {medication.form === 'supositoryo' 
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
                ⚠️ For 6 buwan and older
              </p>
            )}
            {(isAdolDrops && is2YearsOrAbove) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ For children under 2 taon
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
              <span>Kalkulahin ang Dosis</span>
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
      <LanguageToggle currentLanguage="tl" targetLanguage="en" onToggle={onChangeLanguage} />
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
                <span className="text-red-600 text-4xl">Kalkulador ng Lagnat</span>
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
                Kalkulador ng Dosis ng Pampababa ng Lagnat at Pampaawas ng Sakit para sa mga Bata
              </h1>
            </div>
            <p className="text-gray-600 mb-3">
              Kalkulahin ang tamang dosis para sa inyong anak batay sa timbang at uri ng gamot
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
              Kalkulador
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Medikal na Impormasyon
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Impormasyon ng Bata
                </CardTitle>
                <CardDescription>
                  Ilagay ang edad at timbang ng bata
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-1">
                      Ilang taon na ang inyong anak?
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={ageCategory === 'infant' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('infant')
                          setAgeUnit('buwan')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">👶</div>
                          <div>Wala pang 1 taon</div>
                          <div className="text-xs opacity-70">(1-12 buwan)</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={ageCategory === 'child' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('child')
                          setAgeUnit('taon')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🧒</div>
                          <div>Higit sa 1 taon</div>
                          <div className="text-xs opacity-70">(1-14 taon)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">
                        {ageCategory === 'infant' ? 'Pumili ng edad in buwan' : 'Pumili ng edad in taon'}
                      </label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder={ageCategory === 'infant' ? 'Select buwan' : 'Select taon'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
                            // 1-12 buwan
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'month' : 'buwan'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 taon
                            Array.from({ length: 14 }, (_, i) => i + 1).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} {year === 1 ? 'year' : 'taon'}
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
                      <label className="text-sm font-medium">Timbang ng Bata (kg)</label>
                      <Select value={weight} onValueChange={setWeight}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Pumili ng timbang" />
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
                <h2 className="text-xl font-semibold">Pumili ng anyo ng gamot:</h2>
                
                {/* Medication Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={medicationType === 'syrup' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('syrup')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>Syrup</span>
                  </Button>
                  <Button
                    variant={medicationType === 'supositoryo' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('supositoryo')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💊</span>
                    <span>Supositoryo</span>
                  </Button>
                </div>
              </div>

              {medicationType === 'syrup' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Mga gamot na Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medicationsData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Note about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        If you have a Paracetamol medication and didn't find it in the images above, you can select the medication with the same concentration and you will get the same required dose. For example, concentration 
                        {' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofen Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Mga Gamot na Ibuprofen</h3>
                      <Badge variant="outline" className="text-green-600">
                        Edad na higit sa 6 na buwan
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        Para sa lagnat o sakit na hindi gumagaling sa paracetamol, maaaring magrekomenda ang inyong doktor ng mas malakas na pampababa ng lagnat o pampaawas ng sakit tulad ng ibuprofen, palit-palit sa paracetamol bawat 4 na oras kung kinakailangan
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Tandaan:</strong> Ang Ibuprofen ay hindi nakikipag-ugnayan sa paracetamol at maaaring inumin nang sabay
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

              {medicationType === 'supositoryo' && (
                <>
                  {/* Mga Supositoryo ng Paracetamol Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Mga Supositoryo ng Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositoriesData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Mga Supositoryo ng Diclofenac Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Mga Supositoryo ng Diclofenac</h3>
                      <Badge variant="outline" className="text-green-600">
                        Para sa mga bata na higit sa 1 taon
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        For fever or pain that doesn't respond to paracetamol, your doctor may recommend a stronger fever reducer or pain reliever such as diclofenac suppositories
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Tandaan:</strong> Diclofenac suppositories do not interact with paracetamol, but they belong to the same family as ibuprofen syrup. Do not take them at the same time and leave 8 hours between them
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
                  Kalkulahin ang Dosis
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  I-reset
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
                  I-reset
                </Button>
              </div>
            )}

            {/* Results */}
            <Card id="results-section" className="transition-all duration-500">
              <CardHeader>
                <CardTitle>Resulta ng Kalkulasyon</CardTitle>
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
                        <h3 className="font-semibold text-green-800 mb-2">Nakalkulang Dosis:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSuppository ? (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Bilang ng Supositoryo:</strong> {result.suppositories} supositoryo
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Kinakailangang Dami:</strong> {result.volume} ml
                            </p>
                          )}
                          <p><strong>Gamot:</strong> {result.medication.name}</p>
                          <p><strong>Timbang ng Bata:</strong> {result.weight} kg</p>
                          <p><strong>Dalas:</strong> {result.frequency}</p>
                          <p><strong>Pinakamataas na Pang-araw-araw:</strong> {result.maxDailyDoses} dosis</p>
                          {/* NSAIDs Warning for Ibuprofen and Diclofenac */}
                          {(result.medication.ingredient === 'Ibuprofen' || result.medication.ingredient === 'Diclofenac') && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-orange-800 text-sm font-medium">
                                Huwag pagsamahin ang ibuprofen syrup at diclofenac supositoryo nang sabay; magpahinga ng 8 oras sa pagitan nila
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                              Binuo ni{' '}
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
                          Para sa mga Madalas Itanong at karagdagang paliwanag, mag-click dito
                        </Button>
                      </div>
                      
                      {/* Warning Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong>Mahalagang Babala:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                              <li>Ang kalkulador na ito ay para sa gabay lamang. Palaging kumunsulta sa doktor bago magbigay ng anumang gamot sa inyong anak. Huwag lumampas sa inirerekomendang dosis at huwag magbigay ng gamot nang higit sa 3-5 araw nang walang konsultasyon sa doktor.</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInMonths = ageUnit === 'taon' ? ageNum * 12 : ageNum
                                return ageUnit === 'buwan' && ageInMonths === 1 && (
                                  <li>For infants under one month with fever, it's best not to give fever reducers and go to the hospital for examination.</li>
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
                    Ilagay ang edad at timbang ng bata at pumili ng gamot upang kalkulahin ang dosis
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
                    Comprehensive Drug Families Guide
                  </CardTitle>
                  <CardDescription>
                    Learn about different types of medications, how they work, and available brand names
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {/* Paracetamol Family */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">Paracetamol Family (Acetaminophen)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Popular Brand Names
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            Available forms: <strong>suppositories, syrup, patak</strong>
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
                                Popular Brand Names
                              </h4>
                              <div className="text-purple-800 text-sm mb-3">
                                Available forms: <strong>Syrup</strong>
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
                                Popular Brand Names
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
                                  <span className="text-blue-700">2 buwan</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-blue-700">4-6 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Pinakamataas na Pang-araw-araw:</span>
                                  <span className="text-blue-700">5 dosis</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-blue-700">Drops, Syrup, suppositories</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Mahalagang Babala:</span>
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
                                  <span className="text-red-700">6 buwan</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-red-700">6-8 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Pinakamataas na Pang-araw-araw:</span>
                                  <span className="text-red-700">3 dosis</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Mainly Syrup</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Mahalagang Babala:</span>
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
                                  <span className="font-medium text-gray-700">Pinakamataas na Pang-araw-araw:</span>
                                  <span className="text-red-700">2 dosis</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Supositoryo only</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Mahalagang Babala:</span>
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
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">2 buwan</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 buwan</td>
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
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">5 dosis</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">3 dosis</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">2 dosis</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Available Forms</td>
                                  <td className="p-3 text-center text-blue-700">Drops, Syrup, suppositories</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Mainly Syrup</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Supositoryo only</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Important Warning</td>
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
                            What is the difference between paracetamol medications and (ibuprofen and diclofenac) medications?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-blue-800 text-sm md:text-base">
                            Both are fever reducers and pain relievers. However, (ibuprofen and diclofenac) are considered stronger in reducing fever and pain than the paracetamol family.
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
                            Is there an interaction between paracetamol and (ibuprofen and diclofenac) medications?
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
                            Which medications should not be combined at the same time?
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
                            Should medications be taken after eating or on an empty stomach?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">Mga gamot na Paracetamol</strong> can be taken on an empty stomach.
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
                  <strong className="block mb-2">Important Safety Warnings:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                    <li>Never exceed the recommended dose or allowed frequency</li>
                    <li>Do not give more than one type of medication containing the same active ingredient</li>
                    <li>Do not use medication for more than 3-5 days without medical consultation</li>
                    <li>Ensure there is no allergy to the medication before use</li>
                    <li>Keep all medications out of reach of children</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Palakihinment Dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={() => setPalakihindImage(null)}>
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
                    {enlargedImage.form === 'supositoryo' 
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
                Binuo ni{' '}
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
              <p className="font-semibold text-gray-700">Kalkulador ng Lagnat</p>
              <div className="text-lg font-bold text-gray-800">© Lahat ng Karapatan ay Nakalaan</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t pt-4">
            <p className="mt-1 font-medium">
              <span className="text-black">Makipag-ugnayan: </span>
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
        <p className="text-gray-500 text-lg mb-2">لم يتم تسجيل أي dosis بعد</p>
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
          const dosisIn24h = getDosesInLast24Hours(medication.medicationId)
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
                    Today's Doses: {dosisIn24h}
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

      {/* Current Time Display */}
      <div className="text-center py-2 bg-blue-50 rounded-lg">
        <div className="text-sm text-blue-600">الوقت الحالي</div>
        <div className="text-lg font-semibold text-blue-800">
          {currentTime.toLocaleTimeString('ar-SA', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>
    </div>
  )
}

export default AppPhilippines

