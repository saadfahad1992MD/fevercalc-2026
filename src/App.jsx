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
import { ShareModal } from './components/ShareModal.jsx'
import linkedinLogo from './assets/linkedin-logo.png'
import './App.css'

// Import country-specific medication data
import { medicationsIndia } from './data/medicationsIndia.js'
import { medicationsEgypt } from './data/medicationsEgypt.js'
import { medicationsPhilippines } from './data/medicationsPhilippines.js'

// Import medication images
import adolSyrupImg from './assets/medications/adol_syrup.webp'
import adolDropsImg from './assets/medications/adol_drops_new_updated.webp'
import fevadolImg from './assets/medications/fevadol_new.jpg'
import panadolImg from './assets/medications/panadol_children_5_12.webp'
import panadolMotherChildImg from './assets/medications/panadol_baby_infant.jpeg'
import panadolBabySuspensionImg from './assets/medications/panadol_baby_suspension.webp'
import defadolImg from './assets/medications/defadol.jpg'
import nurofenImg from './assets/medications/nurofen.webp'
import brufenImg from './assets/medications/brufen.webp'
import profinalImg from './assets/medications/profinal.webp'
import brufen2Img from './assets/medications/brufen2.webp'
import sapofenImg from './assets/medications/sapofen.webp'

// Import suppository images
import fevadol100SuppImg from './assets/suppositories/fevadol_100.webp'
import fevadol200SuppImg from './assets/suppositories/fevadol_200.jpg'
import fevadol350SuppImg from './assets/suppositories/fevadol_350.jpg'
import adol125SuppImg from './assets/suppositories/adol_125.jpg'
import adol250SuppImg from './assets/suppositories/adol_250.webp'
import tylenol100SuppImg from './assets/suppositories/tylenol_100.jpg'
import tylenol200SuppImg from './assets/suppositories/tylenol_200.webp'
import tylenol350SuppImg from './assets/suppositories/tylenol_350.jpg'
import rofenac12_5SuppImg from './assets/suppositories/rofenac_12_5.png'
import rofenac25SuppImg from './assets/suppositories/rofenac_25.webp'
import voltaren12_5SuppImg from './assets/suppositories/voltaren_12_5.jpg'
import voltaren25SuppImg from './assets/suppositories/voltaren_25.webp'

const medications = {
  paracetamol: [
    {
      id: 'adol_drops',
      name: 'أدول قطرات',
      ingredient: 'باراسيتامول',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'قطرات',
      image: adolDropsImg,
      ageRestriction: 'عمر سنتين و أقل'
    },
    {
      id: 'adol_syrup',
      name: 'أدول شراب',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: adolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'fevadol',
      name: 'فيفادول',
      ingredient: 'باراسيتامول',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: fevadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-mother-child',
      name: 'بانادول',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: panadolMotherChildImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-baby',
      name: 'بانادول',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: panadolBabySuspensionImg,
      ageRestriction: ''
    },
    {
      id: 'defadol',
      name: 'ديفادول',
      ingredient: 'باراسيتامول',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: defadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-children',
      name: 'بانادول',
      ingredient: 'باراسيتامول',
      concentration: 240, // mg per 5ml (Children's 5-12 years)
      volume: 5, // ml
      form: 'شراب',
      image: panadolImg,
      ageRestriction: 'مناسب من عمر 5 سنوات'
    }
  ],
  ibuprofen: [
    {
      id: 'nurofen',
      name: 'نيوروفين',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: nurofenImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'brufen',
      name: 'بروف',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: brufenImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'profinal',
      name: 'بروفينال',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: profinalImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'brufen2',
      name: 'بروفين',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: brufen2Img,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'sapofen',
      name: 'سابوفين',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: sapofenImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    }
  ]
}

const suppositories = {
  paracetamol: [
    // 100mg suppositories
    {
      id: 'fevadol_100_supp',
      name: 'فيفادول 100',
      ingredient: 'باراسيتامول',
      concentration: 100,
      form: 'تحميلة',
      image: fevadol100SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 كيلوغرام'
    },
    {
      id: 'tylenol_100_supp',
      name: 'تايلينول 100',
      ingredient: 'باراسيتامول',
      concentration: 100,
      form: 'تحميلة',
      image: tylenol100SuppImg,
      ageRestriction: '6-12.9',
      weightRange: '6-12.9 كيلوغرام'
    },
    // 125mg suppositories
    {
      id: 'adol_125_supp',
      name: 'أدول 125',
      ingredient: 'باراسيتامول',
      concentration: 125,
      form: 'تحميلة',
      image: adol125SuppImg,
      ageRestriction: '8-12.9',
      weightRange: '8-12.9 كيلوغرام'
    },
    // 200mg suppositories
    {
      id: 'fevadol_200_supp',
      name: 'فيفادول 200',
      ingredient: 'باراسيتامول',
      concentration: 200,
      form: 'تحميلة',
      image: fevadol200SuppImg,
      ageRestriction: '13-20',
      weightRange: '13-20 كيلوغرام'
    },
    {
      id: 'tylenol_200_supp',
      name: 'تايلينول 200',
      ingredient: 'باراسيتامول',
      concentration: 200,
      form: 'تحميلة',
      image: tylenol200SuppImg,
      ageRestriction: '13-20',
      weightRange: '13-20 كيلوغرام'
    },
    // 250mg suppositories
    {
      id: 'adol_250_supp',
      name: 'أدول 250',
      ingredient: 'باراسيتامول',
      concentration: 250,
      form: 'تحميلة',
      image: adol250SuppImg,
      ageRestriction: '15-22',
      weightRange: '15-22 كيلوغرام'
    },
    // 350mg suppositories
    {
      id: 'fevadol_350_supp',
      name: 'فيفادول 350',
      ingredient: 'باراسيتامول',
      concentration: 350,
      form: 'تحميلة',
      image: fevadol350SuppImg,
      ageRestriction: '23-35',
      weightRange: '23-35 كيلوغرام'
    },
    {
      id: 'tylenol_350_supp',
      name: 'تايلينول 350',
      ingredient: 'باراسيتامول',
      concentration: 350,
      form: 'تحميلة',
      image: tylenol350SuppImg,
      ageRestriction: '23-35',
      weightRange: '23-35 كيلوغرام'
    }
  ],
  diclofenac: [
    // 12.5mg suppositories
    {
      id: 'rofenac_12_5_supp',
      name: 'روفيناك 12.5',
      ingredient: 'ديكلوفيناك',
      concentration: 12.5,
      form: 'تحميلة',
      image: rofenac12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 كيلوغرام'
    },
    {
      id: 'voltaren_12_5_supp',
      name: 'فولتارين 12.5',
      ingredient: 'ديكلوفيناك',
      concentration: 12.5,
      form: 'تحميلة',
      image: voltaren12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 كيلوغرام'
    },
    // 25mg suppositories
    {
      id: 'rofenac_25_supp',
      name: 'روفيناك 25',
      ingredient: 'ديكلوفيناك',
      concentration: 25,
      form: 'تحميلة',
      image: rofenac25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 كيلوغرام'
    },
    {
      id: 'voltaren_25_supp',
      name: 'فولتارين 25',
      ingredient: 'ديكلوفيناك',
      concentration: 25,
      form: 'تحميلة',
      image: voltaren25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 كيلوغرام'
    }
  ]
}

function App({ onChangeLanguage, country = 'DEFAULT', language = 'ar' }) {
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

  // Select medications based on country
  const medicationsData = country === 'IN' ? medicationsIndia : (country === 'EG' ? medicationsEgypt : (country === 'PH' ? medicationsPhilippines : medications))
  const suppositoriesData = country === 'IN' ? medicationsIndia.suppositories : (country === 'PH' ? medicationsPhilippines.suppositories : suppositories)

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
      setResult({ error: 'يرجى إدخال وزن صحيح (1-100 كيلوغرام)' })
      return
    }

    // Convert age to months if needed
    const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDoses
    let maxSingleDose // Maximum single dose in mg

    if (selectedMedication.ingredient === 'باراسيتامول') {
      dosagePerKg = 15 // 10-15mg/kg per dose
      frequency = 'كل 4-6 ساعات'
      maxDailyDoses = 5
      maxSingleDose = 500 // Maximum 500mg per dose
    } else if (selectedMedication.ingredient === 'آيبوبروفين') {
      dosagePerKg = 10 // 5-10mg/kg per dose
      frequency = 'كل 6-8 ساعات'
      maxDailyDoses = 3
      maxSingleDose = 400 // Maximum 400mg per dose
    } else if (selectedMedication.ingredient === 'ديكلوفيناك') {
      // New diclofenac calculation logic based on weight ranges
      frequency = 'كل 8-12 ساعة'
      maxDailyDoses = 2
      
      // Check age requirement (minimum 1 year)
      if (ageInMonths < 12) {
        setResult({ error: 'الديكلوفيناك مناسب للأطفال من عمر سنة واحدة فما فوق' })
        return
      }
      
      // Weight-based dosing for diclofenac suppositories
      if (selectedMedication.form === 'تحميلة') {
        let appropriateDose = 0
        if (weightNum >= 8 && weightNum <= 16) {
          appropriateDose = 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          appropriateDose = 25
        } else {
          setResult({ error: 'الديكلوفيناك مناسب للأوزان من 8-25 كيلوغرام فقط' })
          return
        }
        
        // Check if selected medication matches the appropriate dose
        if (selectedMedication.concentration !== appropriateDose) {
          setResult({ error: `يرجى اختيار تحميلة ديكلوفيناك ${appropriateDose}mg المناسبة لوزن طفلك` })
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

    if (selectedMedication.form === 'تحميلة') {
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
      // For syrups and drops, calculate volume needed
      const volumeNeeded = (totalDoseMg * selectedMedication.volume) / selectedMedication.concentration
      
      // Round down based on medication form
      let roundedVolume
      if (selectedMedication.form === 'قطرات') {
        // Drops: round DOWN to nearest 0.1 ml
        roundedVolume = Math.floor(volumeNeeded * 10) / 10
      } else {
        // Syrups: round DOWN to nearest 0.5 ml
        roundedVolume = Math.floor(volumeNeeded * 2) / 2
      }

      setResult({
        medication: selectedMedication,
        weight: weightNum,
        doseMg: totalDoseMg,
        volume: roundedVolume,
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
      if (med.ingredient === 'باراسيتامول') {
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
      if (med.ingredient === 'ديكلوفيناك') {
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
    const isIbuprofen = medication.ingredient === 'آيبوبروفين'
    const ageInMonths = ageUnit === 'years' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if medication is Adol Drops and age is 2 years or above
    const isAdolDrops = medication.id === 'adol_drops'
    const is2YearsOrAbove = age && ageUnit === 'years' && parseFloat(age) >= 2
    
    // Check if suppository is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
    if (medication.form === 'تحميلة' && age && ageUnit && weight) {
      const weightNum = parseFloat(weight)
      
      if (medication.ingredient === 'باراسيتامول') {
        const weightRange = medication.weightRange
        if (weightRange) {
          const weightMatch = weightRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/)
          if (weightMatch) {
            const minWeight = parseFloat(weightMatch[1])
            const maxWeight = parseFloat(weightMatch[2])
            if (weightNum < minWeight || weightNum > maxWeight) {
              isSuppositoryUnsuitable = true
              unsuitabilityReason = `مناسب للوزن ${weightRange}`
            }
          }
        }
      }
      
      if (medication.ingredient === 'ديكلوفيناك') {
        if (ageInMonths < 12) {
          isSuppositoryUnsuitable = true
          unsuitabilityReason = 'مناسب للأطفال أكبر من سنة'
        } else {
          if (weightNum >= 8 && weightNum <= 16) {
            if (medication.concentration !== 12.5) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (25mg), not the unsuitable one
              unsuitabilityReason = 'مناسب للوزن 17-25 كجم'
            }
          } else if (weightNum >= 17 && weightNum <= 25) {
            if (medication.concentration !== 25) {
              isSuppositoryUnsuitable = true
              // Show the range for THIS medication (12.5mg), not the unsuitable one
              unsuitabilityReason = 'مناسب للوزن 8-16 كجم'
            }
          } else {
            isSuppositoryUnsuitable = true
            // Show specific range based on concentration
            if (medication.concentration === 12.5) {
              unsuitabilityReason = 'مناسب للوزن 8-16 كجم'
            } else if (medication.concentration === 25) {
              unsuitabilityReason = 'مناسب للوزن 17-25 كجم'
            } else {
              unsuitabilityReason = 'مناسب للوزن 8-25 كجم'
            }
          }
        }
      }
    }
    
    const isDisabled = (isIbuprofen && isUnder6Months) || isSuppositoryUnsuitable || (isAdolDrops && is2YearsOrAbove)

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ يرجى إدخال العمر والوزن أولاً')
        return
      }
      
      if (isSuppositoryUnsuitable) {
        alert(`⚠️ تحذير: هذه التحميلة غير مناسبة لطفلك\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Months) {
        alert('⚠️ تحذير: أدوية آيبوبروفين مناسبة للأطفال من عمر 6 أشهر فما فوق فقط')
        return
      }
      
      if (isAdolDrops && is2YearsOrAbove) {
        alert('⚠️ تحذير: أدول قطرات مناسبة للأطفال أقل من سنتين فقط')
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
              title="اضغط للتكبير"
            >
              <ZoomIn className="w-3 h-3" />
              <span>تكبير</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="text-right font-semibold text-lg">{medication.name}</h3>
            <p className="text-right text-sm text-gray-600">{medication.ingredient}</p>
            <div className="text-right text-sm text-gray-500">
              <span>التركيز: </span>
              <span className="font-bold text-blue-600" dir="ltr">
                {medication.form === 'تحميلة' 
                  ? `${medication.concentration}mg`
                  : `${medication.concentration}mg/${medication.volume}ml`
                }
              </span>
              <span className="mr-2">{medication.form}</span>
            </div>
            {medication.ageRestriction && (
              <p className="text-right text-xs text-blue-600 font-medium mt-1">
                {medication.ageRestriction}
              </p>
            )}
            {(isIbuprofen && isUnder6Months) && (
              <p className="text-right text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ للأطفال من 6 أشهر فما فوق
              </p>
            )}
            {(isAdolDrops && is2YearsOrAbove) && (
              <p className="text-right text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ للأطفال أقل من سنتين
              </p>
            )}
            {isSuppositoryUnsuitable && (
              <p className="text-right text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
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
                    const targetPosition = resultsTop - stickyHeaderHeight - 20
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
              <span>احسب الجرعة</span>
              <span>💊</span>
            </button>
          </div>
        )}
      </CardContent>
    </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      <LanguageToggle currentLanguage="ar" targetLanguage="en" onToggle={onChangeLanguage} />
      {/* Top Brand Header */}
      <div className="sticky top-0 bg-white text-gray-800 pt-12 pb-6 sm:pt-6 shadow-lg border-b-2 border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-4 relative">
          {/* Share Button - Fixed position on mobile to align with language toggle */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="absolute left-1 top-1 sm:relative sm:left-auto sm:top-auto flex items-center gap-2 px-3 py-2 sm:px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-200 shadow-md"
            title="شارك الموقع"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"/>
              </svg>
              <span className="text-sm sm:text-base">شارك</span>
          </button>
          
          <div className="flex items-center justify-between">
            {/* Left placeholder on desktop */}
            <div className="hidden sm:block sm:w-24"></div>
            
            {/* Center - Logo */}
            <div className="flex items-center gap-3 sm:gap-4 mx-auto sm:mx-0">
              {/* Icon Container */}
              <div className="bg-red-100 rounded-2xl p-2 sm:p-3 shadow-md border border-red-200">
                <span className="text-3xl sm:text-4xl">🌡️</span>
              </div>
              
              {/* Text Container */}
              <div className="text-center">
                <h1 className="font-bold text-2xl sm:text-3xl tracking-wide">
                  <span className="text-gray-700">موقع </span>
                  <span className="text-red-600 text-3xl sm:text-4xl">حرارة</span>
                </h1>
              </div>
            </div>
            
            {/* Right placeholder on desktop */}
            <div className="hidden sm:block sm:w-24"></div>
          </div>
        </div>
      </div>
      
      {/* Share Modal */}
      <ShareModal 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">
                حاسبة جرعات أدوية خفض الحرارة و المسكنات للأطفال
              </h1>
            </div>
            <p className="text-right text-gray-600 mb-3">
              احسب الجرعة الصحيحة لطفلك بناءً على الوزن ونوع الدواء
            </p>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              معلومات طبية
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              الحاسبة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-end text-right">
                  معلومات الطفل
                  <Calculator className="w-5 h-5" />
                </CardTitle>
                <CardDescription className="text-right">
                  أدخل عمر ووزن الطفل
                </CardDescription>
              </CardHeader>
              <CardContent className="text-right">
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-right text-sm font-medium flex items-center gap-1 justify-end">
                      كم عمر طفلك؟
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
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
                          <div>أكثر من سنة</div>
                          <div className="text-right text-xs opacity-70">(1-14 سنة)</div>
                        </div>
                      </Button>
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
                          <div>أقل من سنة</div>
                          <div className="text-right text-xs opacity-70">(1-12 شهر)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 flex flex-col items-end">
                      <label className="text-right text-sm font-medium block text-right">
                        {ageCategory === 'infant' ? 'اختر العمر بالأشهر' : 'اختر العمر بالسنوات'}
                      </label>
                      <Select value={age} onValueChange={setAge} dir="rtl">
                        <SelectTrigger className="text-lg text-right">
                          <SelectValue placeholder={ageCategory === 'infant' ? 'اختر الأشهر' : 'اختر السنوات'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
                            // 1-12 months
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'شهر' : month === 2 ? 'شهران' : 'أشهر'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 years
                            Array.from({ length: 14 }, (_, i) => i + 1).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} {year === 1 ? 'سنة' : year === 2 ? 'سنتان' : 'سنوات'}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Step 3: Weight Selection */}
                  {age && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300 flex flex-col items-end">
                      <label className="text-right text-sm font-medium block text-right">وزن الطفل (كيلوغرام)</label>
                      <Select value={weight} onValueChange={setWeight} dir="rtl">
                        <SelectTrigger className="text-lg text-right">
                          <SelectValue placeholder="اختر الوزن" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'infant' ? (
                            // Infant (< 1 year): 3-16 kg, every 0.5 kg
                            Array.from({ length: 27 }, (_, i) => 3 + (i * 0.5)).map(w => (
                              <SelectItem key={w} value={w.toString()}>
                                {w} كجم
                              </SelectItem>
                            ))
                          ) : (
                            // Child (> 1 year): 6-60 kg
                            <>
                              {/* 6-15 kg: Every 0.5 kg */}
                              {Array.from({ length: 19 }, (_, i) => 6 + (i * 0.5)).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} كجم
                                </SelectItem>
                              ))}
                              {/* 16-30 kg: Every 1 kg */}
                              {Array.from({ length: 15 }, (_, i) => i + 16).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} كجم
                                </SelectItem>
                              ))}
                              {/* 31-60 kg: Every 1 kg */}
                              {Array.from({ length: 30 }, (_, i) => 31 + i).map(w => (
                                <SelectItem key={w} value={w.toString()}>
                                  {w} كجم
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
                <h2 className="text-xl font-semibold text-right">اختر شكل الدواء:</h2>
                
                {/* Medication Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={medicationType === 'suppository' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('suppository')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💊</span>
                    <span>التحاميل</span>
                  </Button>
                  <Button
                    variant={medicationType === 'syrup' ? 'default' : 'outline'}
                    onClick={() => changeMedicationType('syrup')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>الشراب</span>
                  </Button>
                </div>
              </div>

              {medicationType === 'syrup' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 justify-end">
                      <h3 className="text-right text-lg font-semibold text-blue-700">أدوية الباراسيتامول</h3>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {medicationsData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Note about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-right text-sm text-blue-800 leading-relaxed">
                        إذا كان لديك دواء باراسيتامول و لم تجده في الصور أعلاه، بإمكانك إختيار الدواء الذي يحتوي على 
                        نفس التركيز و ستظهر لك نفس الجرعه المطلوبه، على سبيل المثال تركيز{' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofen Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <Badge variant="outline" className="text-green-600">
                        العمر أكبر من 6 أشهر
                      </Badge>
                      <h3 className="text-right text-lg font-semibold text-green-700">أدوية الآيبوبروفين</h3>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-right text-sm text-green-800 leading-relaxed">
                        للحرارة او الالم الذي لا يستجيب للباراسيتامول، قد ينصح طبيبك بأخذ خافض او مسكن أقوى مثل آيبوبروفين و التبديل بينه و بين الباراسيتامول كل ٤ ساعات، اذا لزم الأمر
                      </p>
                      <p className="text-right text-sm text-green-700 font-medium mt-2">
                        <strong>ملاحظة:</strong> آيبوبروفين لا يتعارض مع الباراسيتامول و بالإمكان أخذهم في نفس الوقت
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

              {medicationType === 'suppository' && (
                <>
                  {/* Paracetamol Suppositories Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 justify-end">
                      <h3 className="text-right text-lg font-semibold text-blue-700">تحاميل الباراسيتامول</h3>
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositoriesData.paracetamol.map(med => (
                        <MedicationCard key={med.id} medication={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Diclofenac Suppositories Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 justify-end">
                      <Badge variant="outline" className="text-green-600">
                        العمر أكبر من سنة
                      </Badge>
                      <h3 className="text-right text-lg font-semibold text-green-700">تحاميل الديكلوفيناك</h3>
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-right text-sm text-green-800 leading-relaxed">
                        للحرارة او الالم الذي لا يستجيب للباراسيتامول، قد ينصح طبيبك بأخذ خافض او مسكن أقوى مثل تحاميل الديكلوفيناك
                      </p>
                      <p className="text-right text-sm text-green-700 font-medium mt-2">
                        <strong>ملاحظة:</strong> تحاميل الديكلوفيناك لا تتعارض مع الباراسيتامول، لكنها تنتمي لنفس عائلة شراب آيبوبروفين يجب عدم أخذهم في نفس الوقت و ترك ٨ ساعات بينهم
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
                  احسب الجرعة
                </Button>
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  إعادة تعيين
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
                  إعادة تعيين
                </Button>
              </div>
            )}

            {/* Results */}
            <Card id="results-section" className="transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-right">نتيجة الحساب</CardTitle>
              </CardHeader>
              <CardContent className="text-right">
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
                        <h3 className="text-right font-semibold text-green-800 mb-2">الجرعة المحسوبة:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSuppository ? (
                            <p className="text-right text-lg font-bold text-green-700">
                              <strong>عدد التحاميل:</strong> {result.suppositories} تحميلة
                            </p>
                          ) : (
                            <p className="text-right text-lg font-bold text-green-700">
                              <strong>الكمية المطلوبة:</strong> {result.volume} مل
                            </p>
                          )}
                          <p><strong>الدواء:</strong> {result.medication.name}</p>
                          <p><strong>وزن الطفل:</strong> {result.weight} كيلوغرام</p>
                          <p><strong>التكرار:</strong> {result.frequency}</p>
                          <p><strong>الحد الأقصى يومياً:</strong> {result.maxDailyDoses} جرعات</p>
                          {/* NSAIDs Warning for Ibuprofen and Diclofenac */}
                          {(result.medication.ingredient === 'آيبوبروفين' || result.medication.ingredient === 'ديكلوفيناك') && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-right text-orange-800 text-sm font-medium">
                                لاتجمع بين شراب آيبوبروفين و تحاميل الديكلوفيناك في نفس الوقت يجب ترك ٨ ساعات بينهم
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-right text-xs text-gray-600 flex items-center justify-center gap-1">
                              <span className="text-gray-800">تم تطويره بواسطة</span>
                              {' '}
                              <a 
                                href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                              >
                                د.سعد بن فهد المديميغ
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
                          للأسئلة الشائعة و للشرح الإضافي اضغط هنا
                        </Button>
                      </div>
                      
                      {/* Warning Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200" dir="rtl">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong className="block text-right">تنبيه مهم:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'rtl', paddingRight: '1.5rem'}}>
                              <li>هذه الحاسبة للإرشاد فقط. استشر الطبيب دائماً قبل إعطاء أي دواء لطفلك. لا تتجاوز الجرعة المحددة ولا تعطِ الدواء لأكثر من 3-5 أيام دون استشارة طبية.</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInMonths = ageUnit === 'years' ? ageNum * 12 : ageNum
                                return ageUnit === 'months' && ageInMonths === 1 && (
                                  <li>للرضع أقل من شهر عند وجود حرارة الأفضل عدم إعطاء خافض الحرارة و التوجه للمستشفى للكشف على الطفل.</li>
                                )
                              })()}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  )
                ) : (
                  <p className="text-right text-gray-500 text-center py-8">
                    أدخل عمر ووزن الطفل واختر الدواء لحساب الجرعة
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
                    دليل عائلات الأدوية الشامل
                  </CardTitle>
                  <CardDescription className="text-right">
                    تعرف على أنواع الأدوية المختلفة وآلية عملها والأسماء التجارية المتوفرة
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-right">
                  <Accordion type="single" collapsible className="w-full">
                    {/* Paracetamol/Acetaminophen Family */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">عائلة الباراسيتامول (أسيتامينوفين)</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            الأسماء التجارية الشهيرة
                          </h4>
                          <div className="text-purple-800 text-sm mb-3">
                            متوفر بأشكال: <strong>تحاميل، شراب، قطرات</strong>
                          </div>
                          
                          {/* Note about same concentration */}
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-right text-sm text-blue-800 leading-relaxed">
                              إذا كان لديك دواء باراسيتامول و لم تجده في الصور، بإمكانك إختيار الدواء الذي يحتوي على 
                              نفس التركيز و ستظهر لك نفس الجرعه المطلوبه، على سبيل المثال تركيز{' '}
                              <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                            </p>
                          </div>
                          <div className="grid gap-2 text-purple-800 text-sm">
                            <div>• بيديامول - Pediamol</div>
                            <div>• إيميدول - Emidol</div>
                            <div>• أومول - Omol</div>
                            <div>• ديفادول - Defadol</div>
                            <div>• فيفادول - Fevadol</div>
                            <div>• كالبل - Calpol</div>
                            <div>• بانادول - Panadol</div>
                            <div>• ريفانين - Revani</div>
                            <div>• بانادريكس - Panadrex</div>
                            <div>• أدول - Adol</div>
                            <div>• تايلينول - Tylenol</div>
                            <div>• سيتال - Cetal</div>
                            <div>• تمبرا - Tempra</div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* NSAIDs Family */}
                    <AccordionItem value="nsaids">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Flame className="h-5 w-5 text-red-600" />
                          <span className="text-lg font-semibold">عائلة آيبوبروفين و الديكلوفيناك NSAIDs</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        <Tabs defaultValue="ibuprofen" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ibuprofen">الآيبوبروفين</TabsTrigger>
                            <TabsTrigger value="diclofenac">الديكلوفيناك</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="ibuprofen" className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                الأسماء التجارية الشهيرة
                              </h4>
                              <div className="text-purple-800 text-sm mb-3">
                                متوفر بأشكال: <strong>شراب</strong>
                              </div>
                              <div className="grid gap-2 text-purple-800 text-sm">
                                <div>• نيوروفين - Nurofen</div>
                                <div>• بروفين - Brufen</div>
                                <div>• بروفينال - Profinal</div>
                                <div>• سابوفين - Sapofen</div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="diclofenac" className="space-y-4">
                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                الأسماء التجارية الشهيرة
                              </h4>
                              <div className="text-purple-800 text-sm mb-3">
                                متوفر بأشكال: <strong>تحاميل</strong>
                              </div>
                              <div className="grid gap-2 text-purple-800 text-sm">
                                <div>• فولتارين - Voltaren</div>
                                <div>• روفيناك - Rofenac</div>
                                <div>• ديكلوفين - Diclofen</div>
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
                          <span className="text-lg font-semibold">مقارنة الأدوية وإرشادات الاستخدام</span>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">دليل شامل</Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-6 pt-4">
                        {/* Comparison Table */}
                        <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 text-center text-sm md:text-base">جدول مقارنة الأدوية</h4>
                          
                          {/* Mobile Card View */}
                          <div className="md:hidden space-y-3">
                            {/* Paracetamol Card */}
                            <div className="bg-white border-2 border-blue-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-blue-700 mb-2 text-sm">الباراسيتامول</h5>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">العمر الأدنى:</span>
                                  <span className="text-blue-700">شهرين</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">مدة التأثير:</span>
                                  <span className="text-blue-700">4-6 ساعات</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الحد الأقصى يومياً:</span>
                                  <span className="text-blue-700">5 جرعات</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الأشكال المتوفرة:</span>
                                  <span className="text-blue-700">قطرات، شراب، تحاميل</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">تحذير مهم:</span>
                                  <span className="text-blue-700">-</span>
                                </div>
                              </div>
                            </div>

                            {/* Ibuprofen Card */}
                            <div className="bg-white border-2 border-red-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-red-700 mb-1 text-sm">الآيبوبروفين</h5>
                              <p className="text-right text-center text-xs text-red-500 mb-2">NSAIDs</p>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">العمر الأدنى:</span>
                                  <span className="text-red-700">6 أشهر</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">مدة التأثير:</span>
                                  <span className="text-red-700">6-8 ساعات</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الحد الأقصى يومياً:</span>
                                  <span className="text-red-700">3 جرعات</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الأشكال المتوفرة:</span>
                                  <span className="text-red-700">شراب أساساً</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">تحذير مهم:</span>
                                  <span className="text-red-700">لا تجمع مع الديكلوفيناك</span>
                                </div>
                              </div>
                            </div>

                            {/* Diclofenac Card */}
                            <div className="bg-white border-2 border-red-200 rounded-lg p-3">
                              <h5 className="text-center font-bold text-red-700 mb-1 text-sm">الديكلوفيناك</h5>
                              <p className="text-right text-center text-xs text-red-500 mb-2">NSAIDs</p>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">العمر الأدنى:</span>
                                  <span className="text-red-700">سنة واحدة</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">مدة التأثير:</span>
                                  <span className="text-red-700">8-12 ساعة</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الحد الأقصى يومياً:</span>
                                  <span className="text-red-700">2 جرعة</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">الأشكال المتوفرة:</span>
                                  <span className="text-red-700">تحاميل فقط</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">تحذير مهم:</span>
                                  <span className="text-red-700">لا تجمع مع الآيبوبروفين</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Table View */}
                          <div className="hidden md:block overflow-x-auto">
                            <table className="min-w-full text-sm border-collapse bg-white">
                              <thead>
                                <tr className="border-b border-gray-300">
                                  <th className="text-right p-3 font-semibold whitespace-nowrap">الخاصية</th>
                                  <th className="text-center p-3 font-semibold text-blue-700 whitespace-nowrap">الباراسيتامول</th>
                                  <th className="text-center p-3 font-semibold text-red-700 whitespace-nowrap">
                                    الآيبوبروفين
                                    <div className="text-right text-xs text-red-500 mt-1">NSAIDs</div>
                                  </th>
                                  <th className="text-center p-3 font-semibold text-red-700 whitespace-nowrap">
                                    الديكلوفيناك
                                    <div className="text-right text-xs text-red-500 mt-1">NSAIDs</div>
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">العمر الأدنى</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">شهرين</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 أشهر</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">سنة واحدة</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">مدة التأثير</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">4-6 ساعات</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6-8 ساعات</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">8-12 ساعة</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">الحد الأقصى يومياً</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">5 جرعات</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">3 جرعات</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">2 جرعة</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">الأشكال المتوفرة</td>
                                  <td className="p-3 text-center text-blue-700">قطرات، شراب، تحاميل</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">شراب أساساً</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">تحاميل فقط</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">تحذير مهم</td>
                                  <td className="p-3 text-center text-blue-700">-</td>
                                  <td className="p-3 text-center text-red-700 text-xs">لا تجمع مع الديكلوفيناك</td>
                                  <td className="p-3 text-center text-red-700 text-xs">لا تجمع مع الآيبوبروفين</td>
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
                    الأسئلة الشائعة حول أدوية خفض الحرارة للأطفال
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    إجابات على الأسئلة الأكثر شيوعاً حول استخدام أدوية خفض الحرارة للأطفال
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
                            ما الفرق بين أدوية الباراسيتامول، وأدوية (آيبوبروفين و الديكولفيناك)؟
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-right text-blue-800 text-sm md:text-base">
                            كلاهما خافض حرارة و مسكن. ولكن (آيبوبروفين و الديكلوفناك) يعتبرون أقوى في تخفيض الحرارة و الالم من عائلة الباراسيتامول.
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
                            هل يوجد تعارض بين أدوية الباراسيتامول و أدوية (آيبوبروفين و الديكلوفيناك)؟
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-right text-green-800">
                            لا يوجد تعارض بينهم، و بالإمكان اخذهم في نفس الوقت، و لكن قد يوصي طبيبك بوقت معين بينهم مثل كل ٤ ساعات بين الباراسيتامول و آيبوبروفين ليكون بمقدورك إعطاء أدوية على مدار اليوم.
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
                            ماهي الأدوية التي لا يجب الجمع بينهم في نفس الوقت؟
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-orange-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-orange-800 space-y-2">
                            <p>
                              <strong className="text-red-600">لاتجمع بين أدوية تحتوي على الباراسيتامول</strong> في نفس الوقت يجب ان يكون بينهم ٤-٦ ساعات.
                            </p>
                            <p>
                              <strong className="text-red-600">و لاتجمع بين أدوية تحتوي على آيبوبروفين او الديكلوفيناك</strong> في نفس الوقت يجب ان يكون بينهم ٨ ساعات.
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
                            هل يجب أخذ الأدوية بعد الأكل او على معدة فارغة؟
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">أدوية الباراسيتامول</strong> بالأمكان اخذها على معدة فارغة.
                            </p>
                            <p>
                              <strong className="text-red-600">أدوية آيبوبروفين</strong> يفضل اخذها بعد الاكل او بعد وجبة خفيفة.
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
                  <strong className="block mb-2 text-right">تحذيرات مهمة للسلامة:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'rtl', paddingRight: '1.5rem'}}>
                    <li>لا تتجاوز الجرعة المحددة أو عدد المرات المسموح أبداً</li>
                    <li>لا تعطِ أكثر من نوع دواء يحتوي على نفس المادة الفعالة</li>
                    <li>لا تستخدم الدواء لأكثر من 3-5 أيام دون استشارة طبية</li>
                    <li>تأكد من عدم وجود حساسية للدواء قبل الاستخدام</li>
                    <li>احفظ جميع الأدوية بعيداً عن متناول الأطفال</li>
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
                    alt={`${enlargedImage.name} - صورة ${currentImageIndex + 1}`}
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
                        title="الصورة السابقة"
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
                        title="الصورة التالية"
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
                        صورة {currentImageIndex + 1} من {enlargedImage.images.length}
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
                  <h3 className="text-right text-xl font-semibold">{enlargedImage.name}</h3>
                  <p className="text-right text-gray-600">{enlargedImage.ingredient}</p>
                  <p className="text-right text-gray-500">
                    {enlargedImage.form === 'تحميلة' 
                      ? `${enlargedImage.concentration}mg`
                      : `${enlargedImage.concentration}mg/${enlargedImage.volume}ml`
                    } {enlargedImage.form}
                  </p>
                  {enlargedImage.ageRestriction && (
                    <p className="text-right text-blue-600 font-medium text-sm">
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
              <p className="text-right text-base font-semibold text-gray-800 flex items-center justify-center gap-1">
                <span>تم تطويره بواسطة</span>
                {' '}
                <a 
                  href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  د.سعد بن فهد المديميغ
                </a>
                {' '}
                <a 
                  href="https://www.linkedin.com/in/saad-almodameg-%D8%B3%D8%B9%D8%AF-%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%85%D9%8A%D8%BA-5a0a43308" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1"
                >
                  <img src={linkedinLogo} alt="LinkedIn" className="h-4" />
                </a>
              </p>
              <p className="text-center font-semibold text-gray-700">موقع حرارة</p>
              <div className="text-center text-lg font-bold text-gray-800">© جميع الحقوق محفوظة</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t pt-4">
            <p className="mt-1 font-medium">
              <span className="text-black">للتواصل: </span>
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
        <p className="text-right text-gray-500 text-lg mb-2">لم يتم تسجيل أي جرعات بعد</p>
        <p className="text-right text-gray-400 text-sm">
          استخدم زر "سجل الجرعة الآن" بعد حساب الجرعة لبدء التتبع
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
                  <p className="text-right text-sm text-gray-600">{medication.ingredient}</p>
                </div>
                <div className="text-right">
                  <div className="text-right text-sm text-gray-500">آخر جرعة</div>
                  <div className="text-right text-sm font-medium">
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
                  
                  <div className="text-right text-sm text-gray-600">
                    الجرعات اليوم: {dosesIn24h}
                  </div>
                  
                  {canTakeNext && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Bell className="h-3 w-3 mr-1" />
                        جاهز للجرعة التالية
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
                      الجرعة التالية في: {formatTimeRemaining(timeUntilNext)}
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
          سجل الجرعات الأخيرة
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {doseHistory
            .slice(-10)
            .reverse()
            .map(dose => (
              <div key={dose.id} className="flex items-center justify-between bg-white p-2 rounded border">
                <div>
                  <div className="font-medium text-sm">{dose.medicationName}</div>
                  <div className="text-right text-xs text-gray-600">{dose.amount}</div>
                </div>
                <div className="text-right">
                  <div className="text-right text-xs text-gray-500">
                    {new Date(dose.time).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-right text-sm font-medium">
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
        <div className="text-right text-sm text-blue-600">الوقت الحالي</div>
        <div className="text-right text-lg font-semibold text-blue-800">
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

export default App

