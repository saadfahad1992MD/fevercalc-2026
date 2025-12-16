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
import { ShareModal } from '@/components/ShareModal.jsx'
import linkedinLogo from '@/assets/linkedin-logo.png'
import { medicationsIndia } from '@/data/countries/medicationsIndia.js'
import '@/App.css'

// Import medication images
import adolSyrupImg from '@/assets/medications/adol_syrup.webp'
import adolDropsImg from '@/assets/medications/adol_drops_new_updated.webp'
import fevadolImg from '@/assets/medications/fevadol_new.jpg'
import panadolImg from '@/assets/medications/panadol_children_5_12.webp'
import panadolMotherChildImg from '@/assets/medications/panadol_baby_infant.jpeg'
import panadolBabySuspensionImg from '@/assets/medications/panadol_baby_suspension.webp'
import defadolImg from '@/assets/medications/defadol.jpg'
import nurofenImg from '@/assets/medications/nurofen.webp'
import brufenImg from '@/assets/medications/brufen.webp'
import profinalImg from '@/assets/medications/profinal.webp'
import brufen2Img from '@/assets/medications/brufen2.webp'
import sapofenImg from '@/assets/medications/sapofen.webp'

// Import suppository images
import fevadol100SuppImg from '@/assets/suppositories/fevadol_100.webp'
import fevadol200SuppImg from '@/assets/suppositories/fevadol_200.jpg'
import fevadol350SuppImg from '@/assets/suppositories/fevadol_350.jpg'
import adol125SuppImg from '@/assets/suppositories/adol_125.jpg'
import adol250SuppImg from '@/assets/suppositories/adol_250.webp'
import tylenol100SuppImg from '@/assets/suppositories/tylenol_100.jpg'
import tylenol200SuppImg from '@/assets/suppositories/tylenol_200.webp'
import tylenol350SuppImg from '@/assets/suppositories/tylenol_350.jpg'
import rofenac12_5SuppImg from '@/assets/suppositories/rofenac_12_5.png'
import rofenac25SuppImg from '@/assets/suppositories/rofenac_25.webp'
import voltaren12_5SuppImg from '@/assets/suppositories/voltaren_12_5.jpg'
import voltaren25SuppImg from '@/assets/suppositories/voltaren_25.webp'

// Saudi medications - replaced with Indian medications
/*
const medications = {
  paracetamol: [
    {
      id: 'adol_drops',
      name: 'Adol Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Drops',
      image: adolDropsImg,
      ageRestriction: '2 years and under'
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
      concentration: 240, // mg per 5ml (Children's 5-12 years)
      volume: 5, // ml
      form: 'Syrup',
      image: panadolImg,
      ageRestriction: 'Suitable from 5 years old'
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
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'prof',
      name: 'Prof',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: brufenImg,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'profinal',
      name: 'Profinal',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: profinalImg,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'brufen2',
      name: 'Brufen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: brufen2Img,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'sapofen',
      name: 'Sapofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: sapofenImg,
      ageRestriction: 'Age over 6 months'
    }
  ]
}

const suppositories = {
  paracetamol: [
    // 100mg suppositories
    {
      id: 'fevadol_100_supp',
      name: 'Fevadol 100',
      ingredient: 'Paracetamol',
      concentration: 100,
      form: 'suppository',
      image: fevadol100SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 kg'
    },
    {
      id: 'tylenol_100_supp',
      name: 'Tylenol 100',
      ingredient: 'Paracetamol',
      concentration: 100,
      form: 'suppository',
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
      form: 'suppository',
      image: adol125SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 kg'
    },
    // 200mg suppositories
    {
      id: 'fevadol_200_supp',
      name: 'Fevadol 200',
      ingredient: 'Paracetamol',
      concentration: 200,
      form: 'suppository',
      image: fevadol200SuppImg,
      ageRestriction: '13-22',
      weightRange: '13-22 kg'
    },
    {
      id: 'tylenol_200_supp',
      name: 'Tylenol 200',
      ingredient: 'Paracetamol',
      concentration: 200,
      form: 'suppository',
      image: tylenol200SuppImg,
      ageRestriction: '13-22',
      weightRange: '13-22 kg'
    },
    // 250mg suppositories
    {
      id: 'adol_250_supp',
      name: 'Adol 250',
      ingredient: 'Paracetamol',
      concentration: 250,
      form: 'suppository',
      image: adol250SuppImg,
      ageRestriction: '13-22',
      weightRange: '13-22 kg'
    },
    // 350mg suppositories
    {
      id: 'fevadol_350_supp',
      name: 'Fevadol 350',
      ingredient: 'Paracetamol',
      concentration: 350,
      form: 'suppository',
      image: fevadol350SuppImg,
      ageRestriction: '23-35',
      weightRange: '23-35 kg'
    },
    {
      id: 'tylenol_350_supp',
      name: 'Tylenol 350',
      ingredient: 'Paracetamol',
      concentration: 350,
      form: 'suppository',
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
      form: 'suppository',
      image: rofenac12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 kg'
    },
    {
      id: 'voltaren_12_5_supp',
      name: 'Voltaren 12.5',
      ingredient: 'Diclofenac',
      concentration: 12.5,
      form: 'suppository',
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
      form: 'suppository',
      image: rofenac25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    },
    {
      id: 'voltaren_25_supp',
      name: 'Voltaren 25',
      ingredient: 'Diclofenac',
      concentration: 25,
      form: 'suppository',
      image: voltaren25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    }
  ]
}

*/

// Use Indian medications database (Hindi)
const medications = medicationsIndia;
const suppositories = medicationsIndia.suppositories;

function AppEnglish({ onChangeLanguage }) {
  const [weight, setWeight] = useState('') // String for text input
  const [age, setAge] = useState('') // String for text input
  const [ageUnit, setAgeUnit] = useState('') // 'months' or 'years' - empty by default
  const [ageCategory, setAgeCategory] = useState('') // 'infant' (under 1) or 'child' (1+)
  const [selectedMedication, setSelectedMedication] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculator')
  const [enlargedImage, setEnlargedImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [medicationType, setMedicationType] = useState('syrup') // 'syrup' or 'suppository'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

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
      setResult({ error: 'Please enter a valid weight (1-100 kg)' })
      return
    }

    // Convert age to months if needed
    const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDoses
    let maxSingleDose // Maximum single dose in mg

    if (selectedMedication.ingredient === 'Paracetamol') {
      dosagePerKg = 15 // 10-15mg/kg per dose
      frequency = 'Every 4-6 hours'
      maxDailyDoses = 5
      maxSingleDose = 500 // Maximum 500mg per dose
    } else if (selectedMedication.ingredient === 'Ibuprofen') {
      dosagePerKg = 10 // 5-10mg/kg per dose
      frequency = 'Every 6-8 hours'
      maxDailyDoses = 3
      maxSingleDose = 400 // Maximum 400mg per dose
    } else if (selectedMedication.ingredient === 'Diclofenac') {
      // New diclofenac calculation logic based on weight ranges
      frequency = 'Every 8-12 hours'
      maxDailyDoses = 2
      
      // Check age requirement (minimum 1 year)
      if (ageInMonths < 12) {
        setResult({ error: 'Diclofenac is suitable for children aged one year and above' })
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
          setResult({ error: 'डाइक्लोफेनाक केवल 8-25 किलोग्राम वजन के लिए उपयुक्त है' })
          return
        }
        
        // Check if selected medication matches the appropriate dose
        if (selectedMedication.concentration !== appropriateDose) {
          setResult({ error: `Please select Diclofenac suppository ${appropriateDose}mg appropriate for your child's weight` })
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
      // For suppositories, always show one suppository
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
  const getAppropriateSuppositoriesForAge = (ageInMonths, weightNum) => {
    if (!weightNum) return []
    
    // Get all suppositories from the suppositories object
    const paracetamolSupps = suppositories.paracetamol || []
    const diclofenacSupps = suppositories.diclofenac || []
    
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
        // Check minimum age (12 months = 1 year)
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
    // Check if medication is Ibuprofen and age is under 6 months
    const isIbuprofen = medication.ingredient === 'Ibuprofen'
    const ageInMonths = ageUnit === 'years' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if medication is Adol Drops and age is 2 years or above
    const isAdolDrops = medication.id === 'adol_drops'
    const is2YearsOrAbove = age && ageUnit === 'years' && parseFloat(age) >= 2
    
    // Check if suppository is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
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
        alert(`⚠️ Warning: This suppository is not suitable for your child\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Months) {
        alert('⚠️ Warning: Ibuprofen medications are suitable for children 6 months and older only')
        return
      }
      
      if (isAdolDrops && is2YearsOrAbove) {
        alert('⚠️ Warning: Adol Drops are suitable for children under 2 years old only')
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
              title="Click to Enlarge"
            >
              <ZoomIn className="w-3 h-3" />
              <span>बड़ा करें</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{medication.name}</h3>
            <p className="text-sm text-gray-600">{medication.ingredient}</p>
            <div className="text-sm text-gray-500">
              <span>सांद्रता: </span>
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
                ⚠️ For 6 months and older
              </p>
            )}
            {(isAdolDrops && is2YearsOrAbove) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ For children under 2 years
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
              <span>खुराक की गणना करें</span>
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
      <LanguageToggle currentLanguage="hi" targetLanguage="en" countryCode="in" onToggle={onChangeLanguage} />
      {/* Top Brand Header */}
      <div className="sticky top-0 bg-white text-gray-800 pt-12 pb-6 sm:pt-6 shadow-lg border-b-2 border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-4 relative">
          {/* Share Button - Fixed position on mobile to align with language toggle */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="absolute left-1 top-1 sm:relative sm:left-auto sm:top-auto flex items-center gap-2 px-3 py-2 sm:px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-200 shadow-md"
            title="शेयर करें"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"/>
              </svg>
              <span className="text-sm sm:text-base">शेयर करें</span>
          </button>
          
          <div className="flex items-center justify-center gap-4">
            {/* Icon Container */}
            <div className="bg-red-100 rounded-2xl p-3 shadow-md border border-red-200">
              <span className="text-4xl">🌡️</span>
            </div>
            
            {/* Text Container */}
            <div className="text-center">
              <h1 className="font-bold text-3xl tracking-wide">
                <span className="text-red-600 text-4xl">फीवर कैल्क</span>
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
                बच्चों के लिए बुखार की दवा और दर्द निवारक खुराक कैलकुलेटर
              </h1>
            </div>
            <p className="text-gray-600 mb-3">
              वजन और दवा के प्रकार के आधार पर अपने बच्चे के लिए सही खुराक की गणना करें
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
              कैलकुलेटर
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              चिकित्सा जानकारी
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  बच्चे की जानकारी
                </CardTitle>
                <CardDescription>
                  बच्चे की उम्र और वजन दर्ज करें
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-1">
                      आपके बच्चे की उम्र कितनी है?
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
                          <div>1 साल से कम</div>
                          <div className="text-xs opacity-70">(1-12 महीने)</div>
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
                          <div>1 साल से ज्यादा</div>
                          <div className="text-xs opacity-70">(1-14 साल)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">
                        {ageCategory === 'infant' ? 'महीनों में उम्र चुनें' : 'सालों में उम्र चुनें'}
                      </label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder={ageCategory === 'infant' ? 'महीने चुनें' : 'साल चुनें'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
                            // 1-12 months
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'month' : 'months'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 years
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
                      <label className="text-sm font-medium">बच्चे का वजन (किलो)</label>
                      <Select value={weight} onValueChange={setWeight}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="वजन चुनें" />
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
                <h2 className="text-xl font-semibold">दवा का प्रकार चुनें:</h2>
                
                {/* Medication Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={medicationType === 'syrup' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('syrup')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>सिरप</span>
                  </Button>
                  <Button
                    variant={medicationType === 'suppository' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('suppository')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💊</span>
                    <span>सपोजिटरी</span>
                  </Button>
                </div>
              </div>

              {medicationType === 'syrup' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">पैरासिटामोल दवाएं</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medications.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Note about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        यदि आपके पास पैरासिटामोल दवा है और आपको उपरोक्त चित्रों में नहीं मिली, तो आप उसी सांद्रता वाली दवा का चयन कर सकते हैं और आपको वही आवश्यक खुराक मिलेगी। उदाहरण के लिए, सांद्रता 
                        {' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofen Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">आइबूप्रोफेन दवाएं</h3>
                      <Badge variant="outline" className="text-green-600">
                        6 महीने से अधिक उम्र
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        बुखार या दर्द के लिए जो पैरासिटामोल से ठीक नहीं होता, आपका डॉक्टर एक मजबूत बुखार कम करने वाली या दर्द निवारक दवा जैसे आइबूप्रोफेन की सिफारिश कर सकता है, जिसे जरूरत पड़ने पर हर 4 घंटे में पैरासिटामोल के साथ बदलते हुए दिया जा सकता है
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>नोट:</strong> आइबूप्रोफेन पैरासिटामोल के साथ कोई विरोध नहीं करता और एक साथ दिया जा सकता है
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {medications.ibuprofen.map(med => (
                        <MedicationCard key={med.id} medication={med} category="ibuprofen" />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {medicationType === 'suppository' && (
                <>
                  {/* Paracetamol Suppositories Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">पैरासिटामोल सपोजिटरी</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositories.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Diclofenac Suppositories Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">डाइक्लोफेनाक सपोजिटरी</h3>
                      <Badge variant="outline" className="text-green-600">
                        1 साल से अधिक बच्चों के लिए
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        बुखार या दर्द के लिए जो पैरासिटामोल से ठीक नहीं होता, आपका डॉक्टर डाइक्लोफेनाक सपोजिटरी जैसी मजबूत बुखार कम करने वाली या दर्द निवारक दवा की सिफारिश कर सकता है
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>नोट:</strong> डाइक्लोफेनाक सपोजिटरी पैरासिटामोल के साथ प्रतिक्रिया नहीं करती, लेकिन यह आइबूप्रोफेन सिरप के समान परिवार से संबंधित है। इन्हें एक साथ न लें और उनके बीच 8 घंटे का अंतर रखें
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {suppositories.diclofenac.map(med => (
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
                  Calculate Dose
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  रीसेट करें
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
                  रीसेट करें
                </Button>
              </div>
            )}

            {/* Results */}
            <Card id="results-section" className="transition-all duration-500">
              <CardHeader>
                <CardTitle>गणना का परिणाम</CardTitle>
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
                        <h3 className="font-semibold text-green-800 mb-2">गणना की गई खुराक:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSuppository ? (
                            <p className="text-lg font-bold text-green-700">
                              <strong>सपोजिटरी की संख्या:</strong> {result.suppositories} सपोजिटरी
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-700">
                              <strong>आवश्यक मात्रा:</strong> {result.volume} ml
                            </p>
                          )}
                          <p><strong>दवा:</strong> {result.medication.name}</p>
                          <p><strong>बच्चे का वजन:</strong> {result.weight} किलो</p>
                          <p><strong>आवृत्ति:</strong> हर 4-6 घंटे</p>
                          <p><strong>अधिकतम दैनिक:</strong> {result.maxDailyDoses} खुराक</p>
                          {/* NSAIDs Warning for Ibuprofen and Diclofenac */}
                          {(result.medication.ingredient === 'Ibuprofen' || result.medication.ingredient === 'Diclofenac') && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-orange-800 text-sm font-medium">
                                आइबूप्रोफेन सिरप और डाइक्लोफेनाक सपोजिटरी को एक साथ न मिलाएं; उनके बीच 8 घंटे का अंतर रखें
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                              Developed by{' '}
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
                          अक्सर पूछे जाने वाले प्रश्न और अतिरिक्त जानकारी के लिए यहां क्लिक करें
                        </Button>
                      </div>
                      
                      {/* Warning Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong>महत्वपूर्ण चेतावनी:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                              <li>यह कैलकुलेटर केवल मार्गदर्शन के लिए है। अपने बच्चे को कोई भी दवा देने से पहले हमेशा डॉक्टर से परामर्श लें। सुझाई गई खुराक से अधिक न दें और चिकित्सकीय परामर्श के बिना 3-5 दिनों से अधिक समय तक दवा न दें।</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum
                                return ageUnit === 'months' && ageInMonths === 1 && (
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
                    खुराक की गणना करने के लिए बच्चे की उम्र और वजन दर्ज करें और दवा चुनें
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
                    दवा परिवारों की व्यापक मार्गदर्शिका
                  </CardTitle>
                  <CardDescription>
                    विभिन्न प्रकार की दवाओं, उनके काम करने के तरीके और उपलब्ध ब्रांड नामों के बारे में जानें
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {/* पैरासिटामोल परिवार */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">पैरासिटामोल परिवार</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Popular Brand Names
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            Available forms: <strong>suppositories, syrup, drops</strong>
                          </div>
                          
                          {/* Note about same concentration */}
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              यदि आपके पास पैरासिटामोल दवा है और आपको चित्रों में नहीं मिली, तो आप उसी सांद्रता वाली दवा का चयन कर सकते हैं और आपको वही आवश्यक खुराक मिलेगी। उदाहरण के लिए, सांद्रता 
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
                          <span className="text-lg font-semibold">आइबूप्रोफेन और डाइक्लोफेनाक "NSAIDs" परिवार</span>
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
                                Available forms: <strong>सिरप</strong>
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
                                <div>• Olfen</div>
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
                          <span className="text-lg font-semibold">दवा तुलना और उपयोग दिशानिर्देश</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">पूर्ण मार्गदर्शिका</Badge>
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
                                  <span className="text-blue-700">2 months</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-blue-700">4-6 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Maximum Daily:</span>
                                  <span className="text-blue-700">5 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-blue-700">Drops, Syrup, suppositories</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Warning:</span>
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
                                  <span className="text-red-700">6 months</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-red-700">6-8 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Maximum Daily:</span>
                                  <span className="text-red-700">3 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Mainly Syrup</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Warning:</span>
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
                                  <span className="font-medium text-gray-700">Maximum Daily:</span>
                                  <span className="text-red-700">2 doses</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Suppositories only</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Warning:</span>
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
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">2 months</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 months</td>
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
                    बच्चों के लिए बुखार की दवाओं के बारे में अक्सर पूछे जाने वाले प्रश्न
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    बच्चों के लिए बुखार की दवाओं के उपयोग के बारे में सबसे आम प्रश्नों के उत्तर
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
                            पैरासिटामोल दवाओं और (आइबूप्रोफेन और डाइक्लोफेनाक) दवाओं के बीच क्या अंतर है?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-blue-800 text-sm md:text-base">
                            दोनों बुखार कम करने वाली और दर्द निवारक दवाएं हैं। हालांकि, (आइबूप्रोफेन और डाइक्लोफेनाक) को पैरासिटामोल परिवार की तुलना में बुखार और दर्द को कम करने में अधिक मजबूत माना जाता है।
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
                            क्या पैरासिटामोल और (आइबूप्रोफेन और डाइक्लोफेनाक) दवाओं के बीच कोई प्रतिक्रिया है?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-green-800">
                            उनके बीच कोई प्रतिक्रिया नहीं है, और उन्हें एक ही समय में लिया जा सकता है, लेकिन आपका डॉक्टर उनके बीच एक विशिष्ट समय की सिफारिश कर सकता है, जैसे कि पैरासिटामोल और आइबूप्रोफेन के बीच हर 4 घंटे, ताकि आप पूरे दिन दवाएं दे सकें।
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
                            कौन सी दवाओं को एक ही समय में नहीं मिलाना चाहिए?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-orange-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-orange-800 space-y-2">
                            <p>
                              <strong className="text-red-600">पैरासिटामोल युक्त दवाओं को एक साथ न मिलाएं</strong> - उनके बीच 4-6 घंटे का अंतर होना चाहिए।
                            </p>
                            <p>
                              <strong className="text-red-600">और आइबूप्रोफेन (ब्रूफेन) या डाइक्लोफेनाक युक्त दवाओं को एक साथ न मिलाएं</strong> - उनके बीच 8 घंटे का अंतर होना चाहिए।
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
                            क्या दवाएं खाने के बाद या खाली पेट लेनी चाहिए?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">पैरासिटामोल दवाएं</strong> खाली पेट ली जा सकती हैं।
                            </p>
                            <p>
                              <strong className="text-red-600">आइबूप्रोफेन (ब्रूफेन) दवाएं</strong> अधिमानतः भोजन या हल्के भोजन के बाद ली जाती हैं।
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
                  <strong className="block mb-2">महत्वपूर्ण सुरक्षा चेतावनियां:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                    <li>अनुशंसित खुराक या अनुमत आवृत्ति से कभी अधिक न करें</li>
                    <li>एक ही सक्रिय घटक युक्त एक से अधिक प्रकार की दवा न दें</li>
                    <li>चिकित्सा परामर्श के बिना 3-5 दिनों से अधिक समय तक दवा का उपयोग न करें</li>
                    <li>उपयोग से पहले सुनिश्चित करें कि दवा से कोई एलर्जी नहीं है</li>
                    <li>सभी दवाओं को बच्चों की पहुंच से दूर रखें</li>
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
                Developed by{' '}
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
              <p className="font-semibold text-gray-700">Fever Calc</p>
              <div className="text-lg font-bold text-gray-800">© All Rights Reserved</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t pt-4">
            <p className="mt-1 font-medium">
              <span className="text-black">For advertising or inquiries: </span>
              <span className="text-blue-600">fever.calc@gmail.com</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Share Modal */}
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
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

export default AppEnglish

