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
import { ShareModalEnglish } from '@/components/ShareModalEnglish.jsx'
import linkedinLogo from '@/assets/linkedin-logo.png'
import { medicationsTurkey } from '@/data/countries/medicationsTurkey.js'
import '@/App.css'

// Indonesia obats use placeholder images defined in medicationsIndonesia.js

// Saudi obats - replaced with Indian obats
/*
const obats = {
  paracetamol: [
    {
      id: 'adol_drops',
      name: 'Adol Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Drops',
      image: adolDropsImg,
      ageRestriction: '2 tahun and under'
    },
    {
      id: 'adol_syrup',
      name: 'Adol Sirup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: adolSirupImg,
      ageRestriction: ''
    },
    {
      id: 'fevadol',
      name: 'Fevadol',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: fevadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-mother-anak',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: panadolMotherChildImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-baby',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: panadolBabySuspensionImg,
      ageRestriction: ''
    },
    {
      id: 'defadol',
      name: 'Defadol',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: defadolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-anak-anak',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 240, // mg per 5ml (Children's 5-12 tahun)
      volume: 5, // ml
      form: 'Sirup',
      image: panadolImg,
      ageRestriction: 'Suitable from 5 tahun old'
    }
  ],
  ibuprofen: [
    {
      id: 'nurofen',
      name: 'Nurofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: nurofenImg,
      ageRestriction: 'Umur di atas 6 bulan'
    },
    {
      id: 'prof',
      name: 'Prof',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: brufenImg,
      ageRestriction: 'Umur di atas 6 bulan'
    },
    {
      id: 'profinal',
      name: 'Profinal',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: profinalImg,
      ageRestriction: 'Umur di atas 6 bulan'
    },
    {
      id: 'brufen2',
      name: 'Brufen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: brufen2Img,
      ageRestriction: 'Umur di atas 6 bulan'
    },
    {
      id: 'sapofen',
      name: 'Sapofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Sirup',
      image: sapofenImg,
      ageRestriction: 'Umur di atas 6 bulan'
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

// Use Turkey obats database
const obats = { paracetamol: medicationsTurkey.paracetamol, ibuprofen: medicationsTurkey.ibuprofen };
const suppositories = medicationsTurkey.suppositories;

function App({ onChangeLanguage }) {
  const [weight, setWeight] = useState('') // String for text input
  const [age, setAge] = useState('') // String for text input
  const [ageUnit, setAgeUnit] = useState('') // 'bulan' or 'tahun' - empty by default
  const [ageCategory, setAgeCategory] = useState('') // 'bayi' (under 1) or 'anak' (1+)
  const [selectedObat, setSelectedObat] = useState(null)
  const [result, setResult] = useState(null)
  const [activeTab, setActiveTab] = useState('calculator')
  const [enlargedImage, setPerbesardImage] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [obatType, setObatType] = useState('syrup') // 'syrup' or 'suppository'
  const [isBagikanModalOpen, setIsBagikanModalOpen] = useState(false)

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
    if (!weight || !age || !ageUnit || !selectedObat) {
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

    // Convert age to bulan if needed
    const ageInBulans = ageUnit === 'tahun' ? ageNum * 12 : ageNum

    let dosagePerKg
    let frequency
    let maxDailyDosiss
    let maxSingleDosis // Maximum single dosis in mg

    if (selectedObat.ingredient === 'Paracetamol') {
      dosagePerKg = 15 // 10-15mg/kg per dosis
      frequency = 'Every 4-6 hours'
      maxDailyDosiss = 5
      maxSingleDosis = 500 // Maximum 500mg per dosis
    } else if (selectedObat.ingredient === 'Ibuprofen') {
      dosagePerKg = 10 // 5-10mg/kg per dosis
      frequency = 'Every 6-8 hours'
      maxDailyDosiss = 3
      maxSingleDosis = 400 // Maximum 400mg per dosis
    } else if (selectedObat.ingredient === 'Diclofenac') {
      // New diclofenac calculation logic based on weight ranges
      frequency = 'Every 8-12 hours'
      maxDailyDosiss = 2
      
      // Check age requirement (minimum 1 year)
      if (ageInBulans < 12) {
        setResult({ error: 'Diclofenac is suitable for anak-anak aged one year ke atas' })
        return
      }
      
      // Weight-based dosing for diclofenac suppositories
      if (selectedObat.form === 'suppository') {
        let appropriateDosis = 0
        if (weightNum >= 8 && weightNum <= 16) {
          appropriateDosis = 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          appropriateDosis = 25
        } else {
          setResult({ error: 'Diclofenac is suitable for weights 8-25 kg only' })
          return
        }
        
        // Check if selected obat matches the appropriate dosis
        if (selectedObat.concentration !== appropriateDosis) {
          setResult({ error: `Please select Diclofenac suppository ${appropriateDosis}mg appropriate for your anak's weight` })
          return
        }
        
        setResult({
          obat: selectedObat,
          weight: weightNum,
          dosisMg: selectedObat.concentration,
          suppositories: 1,
          frequency,
          maxDailyDosiss,
          isSupositoria: true
        })
        return
      }
    }

    let totalDosisMg = weightNum * dosagePerKg

    // Apply maximum dosis limit for paracetamol and ibuprofen
    if (maxSingleDosis && totalDosisMg > maxSingleDosis) {
      totalDosisMg = maxSingleDosis
    }

    if (selectedObat.form === 'suppository') {
      // For suppositories, always show one suppository
      setResult({
        obat: selectedObat,
        weight: weightNum,
        dosisMg: selectedObat.concentration,
        suppositories: 1,
        frequency,
        maxDailyDosiss,
        isSupositoria: true
      })
    } else {
      // For syrups, calculate volume needed
      let volumeNeeded = (totalDosisMg * selectedObat.volume) / selectedObat.concentration
      
      // Round DOWN to nearest 0.1ml for drops, 0.5ml for syrups (safety first)
      if (selectedObat.form === 'Drops') {
        volumeNeeded = Math.floor(volumeNeeded * 10) / 10  // Round down to 0.1ml
      } else {
        volumeNeeded = Math.floor(volumeNeeded * 2) / 2    // Round down to 0.5ml
      }

      setResult({
        obat: selectedObat,
        weight: weightNum,
        dosisMg: totalDosisMg,
        volume: volumeNeeded,
        frequency,
        maxDailyDosiss,
        isSupositoria: false
      })
    }
  }

  const resetForm = () => {
    setWeight('')
    setAge('')
    setAgeUnit('')
    setSelectedObat(null)
    setResult(null)
  }

  const changeObatType = (type) => {
    setObatType(type)
    setSelectedObat(null)
    setResult(null)
  }

  // Function to filter appropriate suppositories based on age and weight
  const getAppropriateSuppositoriesForAge = (ageInBulans, weightNum) => {
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
        // Check minimum age (12 bulan = 1 year)
        if (ageInBulans < 12) return false
        
        // New diclofenac calculation logic:
        // Weight 8-16 kg: 12.5mg dosis
        // Weight 17-25 kg: 25mg dosis
        if (weightNum >= 8 && weightNum <= 16) {
          return med.concentration === 12.5
        } else if (weightNum >= 17 && weightNum <= 25) {
          return med.concentration === 25
        }
        
        return false
      }
      
      // Default return false for unknown obat types
      return false
    })
  }

  const ObatCard = ({ obat, category }) => {
    // Check if obat is Ibuprofen and age is under 6 bulan
    const isIbuprofen = obat.ingredient === 'Ibuprofen'
    const ageInBulans = ageUnit === 'tahun' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Bulans = age && ageUnit && ageInBulans < 6
    
    // Check if obat is Adol Drops and age is 2 tahun or above
    const isAdolDrops = obat.id === 'adol_drops'
    const is2TahunsOrAbove = age && ageUnit === 'tahun' && parseFloat(age) >= 2
    
    // Check if suppository is suitable for current age/weight
    let isSupositoriaUnsuitable = false
    let unsuitabilityReason = ''
    
    if (obat.form === 'suppository' && age && ageUnit && weight) {
      const weightNum = parseFloat(weight)
      
      if (obat.ingredient === 'Paracetamol') {
        const weightRange = obat.weightRange
        if (weightRange) {
          const weightMatch = weightRange.match(/(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)/)
          if (weightMatch) {
            const minWeight = parseFloat(weightMatch[1])
            const maxWeight = parseFloat(weightMatch[2])
            if (weightNum < minWeight || weightNum > maxWeight) {
              isSupositoriaUnsuitable = true
              unsuitabilityReason = `Suitable for weight ${weightRange} kg`
            }
          }
        }
      }
      
      if (obat.ingredient === 'Diclofenac') {
        if (ageInBulans < 12) {
          isSupositoriaUnsuitable = true
          unsuitabilityReason = 'Suitable for anak-anak over 1 year old'
        } else {
          if (weightNum >= 8 && weightNum <= 16) {
            if (obat.concentration !== 12.5) {
              isSupositoriaUnsuitable = true
              // Show the range for THIS obat (25mg), not the unsuitable one
              unsuitabilityReason = 'Suitable for weight 17-25 kg'
            }
          } else if (weightNum >= 17 && weightNum <= 25) {
            if (obat.concentration !== 25) {
              isSupositoriaUnsuitable = true
              // Show the range for THIS obat (12.5mg), not the unsuitable one
              unsuitabilityReason = 'Suitable for weight 8-16 kg'
            }
          } else {
            isSupositoriaUnsuitable = true
            // Show specific range based on concentration
            if (obat.concentration === 12.5) {
              unsuitabilityReason = 'Suitable for weight 8-16 kg'
            } else if (obat.concentration === 25) {
              unsuitabilityReason = 'Suitable for weight 17-25 kg'
            } else {
              unsuitabilityReason = 'Suitable for weight 8-25 kg'
            }
          }
        }
      }
    }
    
    const isDisabled = (isIbuprofen && isUnder6Bulans) || isSupositoriaUnsuitable || (isAdolDrops && is2TahunsOrAbove)

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ Please enter age and weight first')
        return
      }
      
      if (isSupositoriaUnsuitable) {
        alert(`⚠️ Peringatan: This suppository is not suitable for your anak\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Bulans) {
        alert('⚠️ Peringatan: Ibuprofen obats are suitable for anak-anak 6 bulan and older only')
        return
      }
      
      if (isAdolDrops && is2TahunsOrAbove) {
        alert('⚠️ Peringatan: Adol Drops are suitable for anak-anak under 2 tahun old only')
        return
      }
      setSelectedObat(obat)
    }

    return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        selectedObat?.id === obat.id 
          ? 'ring-2 ring-blue-500 bg-blue-50' 
          : 'hover:bg-gray-50'
      }`}
      onClick={handleClick}
      style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {obat.images ? (
              <div className="flex gap-1">
                {obat.images.map((img, index) => (
                  <img 
                    key={index}
                    src={img} 
                    alt={`${obat.name} ${index + 1}`}
                    className="w-8 h-16 object-contain rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <img 
                src={obat.image} 
                alt={obat.name}
                className="w-16 h-16 object-contain rounded-lg"
              />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setPerbesardImage(obat)
                setCurrentImageIndex(0)
              }}
              className="flex items-center gap-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-colors duration-200"
              title="Click to Perbesar"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Perbesar</span>
            </button>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{obat.name}</h3>
            <p className="text-sm text-gray-600">{obat.ingredient}</p>
            <div className="text-sm text-gray-500">
              <span>Konsentrasi: </span>
              <span className="font-bold text-blue-600" dir="ltr">
                {obat.form === 'suppository' 
                  ? `${obat.concentration}mg`
                  : `${obat.concentration}mg/${obat.volume}ml`
                }
              </span>
              <span className="mr-2">{obat.form}</span>
            </div>
            {obat.ageRestriction && (
              <p className="text-xs text-blue-600 font-medium mt-1">
                {obat.ageRestriction}
              </p>
            )}
            {(isIbuprofen && isUnder6Bulans) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ For 6 bulan and older
              </p>
            )}
            {(isAdolDrops && is2TahunsOrAbove) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ Untuk anak-anak under 2 tahun
              </p>
            )}
            {isSupositoriaUnsuitable && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ {unsuitabilityReason}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-300">
              {selectedObat?.id === obat.id && (
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              )}
            </div>
          </div>
        </div>
        {selectedObat?.id === obat.id && weight && age && ageUnit && (
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
              <span>Hitung Dosis</span>
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
      <LanguageToggle currentLanguage="tr" targetLanguage="en" onToggle={onChangeLanguage} />
      {/* Top Brand Header */}
      <div className="sticky top-0 bg-white text-gray-800 pt-12 pb-6 sm:pt-6 shadow-lg border-b-2 border-gray-100 z-40">
        <div className="max-w-4xl mx-auto px-4 relative">
          {/* Bagikan Button - Fixed position on mobile to align with language toggle */}
          <button
            onClick={() => setIsBagikanModalOpen(true)}
            className="absolute left-1 top-1 sm:relative sm:left-auto sm:top-auto flex items-center gap-2 px-3 py-2 sm:px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-200 shadow-md"
            title="Bagikan"
          >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zm8-2v8h8V3h-8zm6 6h-4V5h4v4zM3 21h8v-8H3v8zm2-6h4v4H5v-4zm13-2h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"/>
              </svg>
              <span className="text-sm sm:text-base">Bagikan</span>
          </button>
          
          <div className="flex items-center justify-center gap-4">
            {/* Icon Container */}
            <div className="bg-red-100 rounded-2xl p-3 shadow-md border border-red-200">
              <span className="text-4xl">🌡️</span>
            </div>
            
            {/* Text Container */}
            <div className="text-center">
              <h1 className="font-bold text-3xl tracking-wide">
                <span className="text-red-600 text-4xl">Kalkulator Demam</span>
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
                Kalkulator Dosis Penurun Demam & Pereda Nyeri untuk Anak
              </h1>
            </div>
            <p className="text-gray-600 mb-3">
              Hitung dosis yang tepat untuk anak Anda berdasarkan berat badan dan jenis obat
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
              Kalkulator
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              Informasi Medis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            {/* Weight and Age Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Informasi Anak
                </CardTitle>
                <CardDescription>
                  Masukkan umur dan berat badan anak
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Step 1: Age Category Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-1">
                      Berapa umur anak Anda?
                      <span className="text-red-500 text-xs">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={ageCategory === 'bayi' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('bayi')
                          setAgeUnit('bulan')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">👶</div>
                          <div>Kurang dari 1 tahun</div>
                          <div className="text-xs opacity-70">(1-12 bulan)</div>
                        </div>
                      </Button>
                      <Button
                        type="button"
                        variant={ageCategory === 'anak' ? 'default' : 'outline'}
                        className="h-20 text-base"
                        onClick={() => {
                          setAgeCategory('anak')
                          setAgeUnit('tahun')
                          setAge('')
                        }}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">🧒</div>
                          <div>Lebih dari 1 tahun</div>
                          <div className="text-xs opacity-70">(1-14 tahun)</div>
                        </div>
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Specific Age Selection */}
                  {ageCategory && (
                    <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                      <label className="text-sm font-medium">
                        {ageCategory === 'bayi' ? 'Select age in bulan' : 'Select age in tahun'}
                      </label>
                      <Select value={age} onValueChange={setAge}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder={ageCategory === 'bayi' ? 'Select bulan' : 'Select tahun'} />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'bayi' ? (
                            // 1-12 bulan
                            Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} {month === 1 ? 'month' : 'bulan'}
                              </SelectItem>
                            ))
                          ) : (
                            // 1-14 tahun
                            Array.from({ length: 14 }, (_, i) => i + 1).map(year => (
                              <SelectItem key={year} value={year.toString()}>
                                {year} {year === 1 ? 'year' : 'tahun'}
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
                      <label className="text-sm font-medium">Child's Berat Badan (kg)</label>
                      <Select value={weight} onValueChange={setWeight}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageCategory === 'bayi' ? (
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

            {/* Obat Selection */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Pilih bentuk obat:</h2>
                
                {/* Obat Type Selection */}
                <div className="flex gap-4 justify-center">
                  <Button
                    variant={obatType === 'syrup' ? 'default' : 'outline'}
                    onClick={() => changeObatType('syrup')}
                    className="flex items-center gap-2 px-6 py-3"
                  >
                    <span>💧</span>
                    <span>Sirup</span>
                  </Button>
                  {/* Suppositories not available in Indonesia */}
                </div>
              </div>

              {obatType === 'syrup' && (
                <>
                  {/* Paracetamol Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Obat Paracetamol</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      {obats.paracetamol.map(med => (
                        <ObatCard key={med.id} obat={med} category="paracetamol" />
                      ))}
                    </div>
                    
                    {/* Catatan about same concentration */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800 leading-relaxed">
                        If you have a Paracetamol obat and didn't find it in the images above, you can select the obat with the same concentration and you will get the same required dosis. For example, concentration 
                        {' '}
                        <span className="font-bold text-blue-600" dir="ltr">120mg/5ml</span>
                      </p>
                    </div>
                  </div>

                  {/* Ibuprofen Section */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Obat Ibuprofen</h3>
                      <Badge variant="outline" className="text-green-600">
                        Umur di atas 6 bulan
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        For demam or nyeri that doesn't respond to paracetamol, your doctor may recommend a stronger demam reducer or nyeri reliever such as ibuprofen, alternating with paracetamol every 4 hours if necessary
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Catatan:</strong> Ibuprofen does not interact with paracetamol and can be taken at the same time
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {obats.ibuprofen.map(med => (
                        <ObatCard key={med.id} obat={med} category="ibuprofen" />
                      ))}
                    </div>
                  </div>
                </>
              )}

              {obatType === 'suppository' && (
                <>
                  {/* Paracetamol Suppositories Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-blue-700">Paracetamol Suppositories</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {suppositories.paracetamol.map(med => (
                        <ObatCard key={med.id} obat={med} category="paracetamol_supp" />
                      ))}
                    </div>
                  </div>
                  
                  {/* Supositoria Diclofenac Section - Show ALL */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <h3 className="text-lg font-semibold text-green-700">Supositoria Diclofenac</h3>
                      <Badge variant="outline" className="text-green-600">
                        Untuk anak-anak over 1 year
                      </Badge>
                    </div>
                    
                    {/* Additional Information */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800 leading-relaxed">
                        For demam or nyeri that doesn't respond to paracetamol, your doctor may recommend a stronger demam reducer or nyeri reliever such as diclofenac suppositories
                      </p>
                      <p className="text-sm text-green-700 font-medium mt-2">
                        <strong>Catatan:</strong> Diclofenac suppositories do not interact with paracetamol, but they belong to the same family as ibuprofen syrup. Do not take them at the same time and leave 8 hours between them
                      </p>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {suppositories.diclofenac.map(med => (
                        <ObatCard key={med.id} obat={med} category="diclofenac_supp" />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {!selectedObat && (
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={calculateDosage}
                  disabled={!weight || !age || !ageUnit || !selectedObat}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                >
                  Hitung Dosis
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
            {selectedObat && (
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
                <CardTitle>Hasil Perhitungan</CardTitle>
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
                        <h3 className="font-semibold text-green-800 mb-2">Dosis yang Dihitung:</h3>
                        <div className="grid gap-2 text-sm">
                          {result.isSupositoria ? (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Number of Suppositories:</strong> {result.suppositories} suppository
                            </p>
                          ) : (
                            <p className="text-lg font-bold text-green-700">
                              <strong>Required Amount:</strong> {result.volume} ml
                            </p>
                          )}
                          <p><strong>Obat:</strong> {result.obat.name}</p>
                          <p><strong>Child's Weight:</strong> {result.weight} kg</p>
                          <p><strong>Frequency:</strong> {result.frequency}</p>
                          <p><strong>Maximum Daily:</strong> {result.maxDailyDosiss} dosiss</p>
                          {/* NSAIDs Peringatan for Ibuprofen and Diclofenac */}
                          {(result.obat.ingredient === 'Ibuprofen' || result.obat.ingredient === 'Diclofenac') && (
                            <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-lg">
                              <p className="text-orange-800 text-sm font-medium">
                                Do not combine ibuprofen syrup and diclofenac suppositories at the same time; leave 8 hours between them
                              </p>
                            </div>
                          )}
                          {/* Developer Credit */}
                          <div className="mt-3 pt-3 border-t border-green-300">
                            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
                              Dikembangkan oleh{' '}
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
                          For FAQs and additional explanation, click here
                        </Button>
                      </div>
                      
                      {/* Peringatan Alert - Moved from top */}
                      <div className="mt-6">
                        <Alert className="bg-orange-50 border-orange-200">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <AlertDescription className="text-orange-800">
                            <strong>Important Peringatan:</strong>
                            <ul className="list-disc mt-2 space-y-1" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                              <li>This calculator is for guidance only. Always consult a doctor before giving any obat to your anak. Do not exceed the recommended dosis and do not give obat for more than 3-5 days without medical consultation.</li>
                              {(() => {
                                const ageValue = convertArabicToEnglish(age)
                                const ageNum = parseFloat(ageValue)
                                const ageInBulans = ageUnit === 'tahun' ? ageNum * 12 : ageNum
                                return ageUnit === 'bulan' && ageInBulans === 1 && (
                                  <li>Untuk bayi under one month with demam, it's best not to give demam reducers and go to the hospital for examination.</li>
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
                    Masukkan umur dan berat badan anak dan pilih obat untuk menghitung dosis
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
                    Learn about different types of obats, how they work, and available brand names
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                     {/* Paracetamol Family */}
                    <AccordionItem value="paracetamol">
                      <AccordionTrigger className="text-right">
                        <div className="flex items-center gap-2 md:gap-3">
                          <Pill className="h-5 w-5 text-blue-600" />
                          <span className="text-lg font-semibold">Paracetamol Family</span>
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
                          
                          {/* Catatan about same concentration */}
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800 leading-relaxed">
                              If you have a Paracetamol obat and didn't find it in the images, you can select the obat with the same concentration and you will get the same required dosis. For example, concentration 
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
                                Available forms: <strong>Sirup</strong>
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
                                  <span className="text-blue-700">2 bulan</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-blue-700">4-6 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Maximum Daily:</span>
                                  <span className="text-blue-700">5 dosiss</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-blue-700">Drops, Sirup, suppositories</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Peringatan:</span>
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
                                  <span className="text-red-700">6 bulan</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Duration of Effect:</span>
                                  <span className="text-red-700">6-8 hours</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Maximum Daily:</span>
                                  <span className="text-red-700">3 dosiss</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Mainly Sirup</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Peringatan:</span>
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
                                  <span className="text-red-700">2 dosiss</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-200 pb-1">
                                  <span className="font-medium text-gray-700">Available Forms:</span>
                                  <span className="text-red-700">Suppositories only</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="font-medium text-gray-700">Important Peringatan:</span>
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
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">2 bulan</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6 bulan</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">1 year</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Duration of Effect</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">4-6 hours</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">6-8 hours</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">8-12 hours</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Maximum Daily Dosiss</td>
                                  <td className="p-3 text-center text-blue-700 whitespace-nowrap">5 dosiss</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">3 dosiss</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">2 dosiss</td>
                                </tr>
                                <tr className="bg-gray-25">
                                  <td className="p-3 font-medium whitespace-nowrap">Available Forms</td>
                                  <td className="p-3 text-center text-blue-700">Drops, Sirup, suppositories</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Mainly Sirup</td>
                                  <td className="p-3 text-center text-red-700 whitespace-nowrap">Suppositories only</td>
                                </tr>
                                <tr>
                                  <td className="p-3 font-medium whitespace-nowrap">Important Peringatan</td>
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
                    Frequently Asked Questions About Demam Reducers for Children
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Answers to the most common questions about using demam reducers for anak-anak
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
                            What is the difference between paracetamol obats and (ibuprofen and diclofenac) obats?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-blue-800 text-sm md:text-base">
                            Both are demam reducers and nyeri relievers. However, (ibuprofen and diclofenac) are considered stronger in reducing demam and nyeri than the paracetamol family.
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
                            Is there an interaction between paracetamol and (ibuprofen and diclofenac) obats?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-green-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <p className="text-green-800">
                            There is no interaction between them, and they can be taken at the same time, but your doctor may recommend a specific time between them, such as every 4 hours between paracetamol and ibuprofen, so you can give obats throughout the day.
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
                            Which obats should not be combined at the same time?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-orange-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-orange-800 space-y-2">
                            <p>
                              <strong className="text-red-600">Do not combine obats containing Paracetamol</strong> at the same time - there must be 4-6 hours between them.
                            </p>
                            <p>
                              <strong className="text-red-600">And do not combine obats containing Ibuprofen (Brufen) or Diclofenac</strong> at the same time - there must be 8 hours between them.
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
                            Should obats be taken after eating or on an empty stomach?
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="bg-teal-50 p-3 md:p-4 rounded-lg mr-0 md:mr-11">
                          <div className="text-teal-800 space-y-2">
                            <p>
                              <strong className="text-blue-600">Obat Paracetamol</strong> can be taken on an empty stomach.
                            </p>
                            <p>
                              <strong className="text-red-600">Ibuprofen (Brufen) obats</strong> are preferably taken after food or a light meal.
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>

                </CardContent>
              </Card>

              {/* Safety Peringatans */}
              <Alert className="bg-red-50 border-red-200">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong className="block mb-2">Important Safety Peringatans:</strong>
                  <ul className="list-disc space-y-1 text-sm" style={{listStylePosition: 'inside', direction: 'ltr', paddingLeft: '1.5rem'}}>
                    <li>Never exceed the recommended dosis or allowed frequency</li>
                    <li>Do not give more than one type of obat containing the same active ingredient</li>
                    <li>Do not use obat for more than 3-5 days without medical consultation</li>
                    <li>Ensure there is no allergy to the obat before use</li>
                    <li>Keep all obats out of reach of anak-anak</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Perbesarment Dialog */}
      <Dialog open={!!enlargedImage} onOpenChange={() => setPerbesardImage(null)}>
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

                {/* Obat Info */}
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
                Dikembangkan oleh{' '}
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
              <p className="font-semibold text-gray-700">Kalkulator Demam</p>
              <div className="text-lg font-bold text-gray-800">© Hak Cipta Dilindungi</div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="border-t pt-4">
            <p className="mt-1 font-medium">
              <span className="text-black">For advertising or inquiries: </span>
              <span className="text-blue-600">demam.calc@gmail.com</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Bagikan Modal */}
      <ShareModalEnglish isOpen={isBagikanModalOpen} onClose={() => setIsBagikanModalOpen(false)} />
    </div>
  )
}

// Dosage Timeline Visualizer Component
const DosageTimelineVisualizer = ({ 
  dosisHistory, 
  currentTime, 
  getLastDosis, 
  getTimeUntilNextDosis, 
  getProgressPercentage, 
  formatTimeRemaining, 
  getDosissInLast24Hours 
}) => {
  // Get unique obats from dosis history
  const uniqueObats = [...new Set(dosisHistory.map(dosis => dosis.obatId))]
    .map(id => dosisHistory.find(dosis => dosis.obatId === id))

  if (dosisHistory.length === 0) {
    return (
      <div className="text-center py-8">
        <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg mb-2">لم يتم تسجيل أي dosiss بعد</p>
        <p className="text-gray-400 text-sm">
          استخدم زر "سجل الdosis الآن" بعد حساب الdosis لبدء التتبع
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Active Obats */}
      <div className="grid gap-4">
        {uniqueObats.map(obat => {
          const lastDosis = getLastDosis(obat.obatId)
          const timeUntilNext = getTimeUntilNextDosis(lastDosis)
          const progress = getProgressPercentage(lastDosis)
          const dosissIn24h = getDosissInLast24Hours(obat.obatId)
          const canTakeNext = timeUntilNext === 0

          return (
            <div key={obat.obatId} className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">{obat.obatName}</h4>
                  <p className="text-sm text-gray-600">{obat.ingredient}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">آخر dosis</div>
                  <div className="text-sm font-medium">
                    {new Date(lastDosis.time).toLocaleTimeString('ar-SA', { 
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
                    Today's Dosiss: {dosissIn24h}
                  </div>
                  
                  {canTakeNext && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <Bell className="h-3 w-3 mr-1" />
                        Ready for Next Dosis
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Dosis Time */}
              {!canTakeNext && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Timer className="h-4 w-4" />
                    <span className="text-sm">
                      Next Dosis in: {formatTimeRemaining(timeUntilNext)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Recent Dosis History */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Dosis Log
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {dosisHistory
            .slice(-10)
            .reverse()
            .map(dosis => (
              <div key={dosis.id} className="flex items-center justify-between bg-white p-2 rounded border">
                <div>
                  <div className="font-medium text-sm">{dosis.obatName}</div>
                  <div className="text-xs text-gray-600">{dosis.amount}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">
                    {new Date(dosis.time).toLocaleDateString('ar-SA')}
                  </div>
                  <div className="text-sm font-medium">
                    {new Date(dosis.time).toLocaleTimeString('ar-SA', { 
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

export default App

