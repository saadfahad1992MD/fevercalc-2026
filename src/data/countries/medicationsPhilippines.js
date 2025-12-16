// Philippines Pediatric Medications Database
// Paracetamol and Ibuprofen medications commonly available in the Philippines

import biogesicDropsImg from '@/assets/medications/philippines/biogesic_drops.webp'
import biogesic250Img from '@/assets/medications/philippines/biogesic_250.png'
import tempraDropsImg from '@/assets/medications/philippines/tempra_drops.jpg'
import tempra120Img from '@/assets/medications/philippines/tempra_120.png'
import tempraForte250Img from '@/assets/medications/philippines/tempra_forte_250.jpg'
import dolanFp100Img from '@/assets/medications/philippines/dolan_fp_100.jpg'
import dolanFpForte200Img from '@/assets/medications/philippines/dolan_fp_forte_200.png'
import advilSuspensionImg from '@/assets/medications/philippines/advil_suspension.png'

export const medicationsPhilippines = {
  paracetamol: [
    {
      id: 'biogesic_drops',
      name: 'Biogesic Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'drops',
      image: biogesicDropsImg,
      ageRestriction: 'For babies 0-2 years old'
    },
    {
      id: 'biogesic_250',
      name: 'Biogesic for Kids',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: biogesic250Img,
      ageRestriction: ''
    },
    {
      id: 'tempra_drops',
      name: 'Tempra Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'drops',
      image: tempraDropsImg,
      ageRestriction: 'For infants 0-12 months'
    },
    {
      id: 'tempra_120',
      name: 'Tempra Syrup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: tempra120Img,
      ageRestriction: ''
    },
    {
      id: 'tempra_forte_250',
      name: 'Tempra Forte',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: tempraForte250Img,
      ageRestriction: 'For children 6-12 years old'
    }
  ],
  ibuprofen: [
    {
      id: 'dolan_fp_100',
      name: 'Dolan FP',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: dolanFp100Img,
      ageRestriction: 'For children 6 months and above'
    },
    {
      id: 'dolan_fp_forte_200',
      name: 'Dolan FP Forte',
      ingredient: 'Ibuprofen',
      concentration: 200, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: dolanFpForte200Img,
      ageRestriction: 'For older children'
    },
    {
      id: 'advil_suspension',
      name: 'Advil Suspension for Kids',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: advilSuspensionImg,
      ageRestriction: 'For children 6 months and above'
    }
  ],
  suppositories: {
    paracetamol: [],
    diclofenac: []
  }
}
