// Unified medications index - imports all country-specific medications
// and provides a function to get medications by country code

// Import all country medications
import { medications as saudiMedications, suppositories as saudiSuppositories } from './medications.js'
import { medicationsPhilippines } from './countries/medicationsPhilippines.js'
import { medicationsIndonesia } from './countries/medicationsIndonesia.js'
import { medicationsTurkey } from './countries/medicationsTurkey.js'
import { medicationsMexico } from './countries/medicationsMexico.js'
import { medicationsBrazil } from './countries/medicationsBrazil.js'
import { medicationsNigeria } from './countries/medicationsNigeria.js'
import { medicationsIndia } from './countries/medicationsIndia.js'
import { medicationsEgypt } from './countries/medicationsEgypt.js'

// Normalize medication data structure
function normalizeMedications(data) {
  // Handle different data structures from different country files
  if (!data) return { paracetamol: [], ibuprofen: [], suppositories: { paracetamol: [], diclofenac: [] } }
  
  return {
    paracetamol: data.paracetamol || [],
    ibuprofen: data.ibuprofen || [],
    suppositories: {
      paracetamol: data.suppositories?.paracetamol || data.paracetamolSuppositories || [],
      diclofenac: data.suppositories?.diclofenac || data.diclofenacSuppositories || []
    }
  }
}

// All medications by country
export const allMedications = {
  saudi: {
    paracetamol: saudiMedications.paracetamol || [],
    ibuprofen: saudiMedications.ibuprofen || [],
    suppositories: saudiSuppositories || { paracetamol: [], diclofenac: [] }
  },
  philippines: normalizeMedications(medicationsPhilippines),
  indonesia: normalizeMedications(medicationsIndonesia),
  turkey: normalizeMedications(medicationsTurkey),
  mexico: normalizeMedications(medicationsMexico),
  brazil: normalizeMedications(medicationsBrazil),
  nigeria: normalizeMedications(medicationsNigeria),
  india: normalizeMedications(medicationsIndia),
  egypt: normalizeMedications(medicationsEgypt)
}

// Get medications for a specific country
export function getMedicationsForCountry(countryCode) {
  const countryToKey = {
    sa: 'saudi',
    ph: 'philippines',
    id: 'indonesia',
    tr: 'turkey',
    mx: 'mexico',
    br: 'brazil',
    ng: 'nigeria',
    in: 'india',
    eg: 'egypt'
  }
  
  const key = countryToKey[countryCode] || 'saudi'
  return allMedications[key] || allMedications.saudi
}

export default allMedications
