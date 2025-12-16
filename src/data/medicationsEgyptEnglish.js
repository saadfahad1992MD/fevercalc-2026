// Egypt-specific medication data - English version with real Egyptian product images

import cetalDropsImg from '../assets/medications/cetal_drops_new.jpg'
import cetalSyrupImg from '../assets/medications/cetal_syrup_combined.webp'
import abimolSyrupImg from '../assets/medications/abimol_syrup.webp'
import paramolSyrupImg from '../assets/medications/paramol_syrup.jpg'
import panadolBabySuspensionImg from '../assets/medications/panadol_baby_suspension.webp'
import panadolPinkImg from '../assets/medications/panadol_pink.webp'
import brufenImg from '../assets/medications/brufen_new.jpg'
import profinalSyrupImg from '../assets/medications/profinal_syrup.jpg'
import nurofenSyrupImg from '../assets/medications/nurofen_syrup.jpg'
import ibuflamSyrupImg from '../assets/medications/ibuflam_syrup.jpg'
import peralSyrupImg from '../assets/medications/peral_syrup.webp'
import tempraDropsImg from '../assets/medications/tempra_drops.png'
import tempraSyrupImg from '../assets/medications/tempra_syrup.webp'

// Import suppository images
import cetalSuppImg from '../assets/medications/cetal_120_supp.webp'
import abimolSuppImg from '../assets/medications/abimol_300_supp.webp'
import voltaren12_5SuppImg from '../assets/suppositories/voltaren_12_5_egypt.jpg'
import voltaren25SuppImg from '../assets/suppositories/voltaren_25_egypt.png'
import dolphin12_5SuppImg from '../assets/medications/dolphin_12_5_supp.webp'
import dolphin25SuppImg from '../assets/medications/dolphin_25_supp.jpg'
import epifenac12_5SuppImg from '../assets/medications/epifenac_25_supp.png'
import epifenac25SuppImg from '../assets/medications/epifenac_12_5_supp.png'

export const medicationsEgyptEnglish = {
  paracetamol: [
    {
      id: 'cetal_drops',
      name: 'Cetal Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per 1ml
      volume: 1, // ml
      form: 'Drops',
      image: cetalDropsImg,
      ageRestriction: 'Age 2 years and under'
    },
    {
      id: 'cetal_syrup',
      name: 'Cetal Syrup',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: cetalSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'abimol_syrup',
      name: 'Abimol Syrup',
      ingredient: 'Paracetamol',
      concentration: 150, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: abimolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'paramol_syrup',
      name: 'Paramol Syrup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: paramolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'peral_syrup',
      name: 'Peral Syrup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: peralSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'tempra_drops',
      name: 'Tempra Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per 1ml
      volume: 1, // ml
      form: 'Drops',
      image: tempraDropsImg,
      ageRestriction: 'Age 2 years and under'
    },
    {
      id: 'tempra_syrup',
      name: 'Tempra Syrup',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: tempraSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-baby-egypt',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: panadolBabySuspensionImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-pink-egypt',
      name: 'Panadol',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: panadolPinkImg,
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'brufen_egypt',
      name: 'Brufen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: brufenImg,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'profinal_egypt',
      name: 'Profinal',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: profinalSyrupImg,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'nurofen_egypt',
      name: 'Nurofen',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: nurofenSyrupImg,
      ageRestriction: 'Age over 6 months'
    },
    {
      id: 'ibuflam_egypt',
      name: 'Ibuflam',
      ingredient: 'Ibuprofen',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: ibuflamSyrupImg,
      ageRestriction: 'Age over 6 months'
    }
  ]
}

export const suppositoriesEgyptEnglish = {
  paracetamol: [
    // 120mg suppositories
    {
      id: 'cetal_120_supp',
      name: 'Cetal 120',
      ingredient: 'Paracetamol',
      concentration: 120,
      form: 'suppository',
      image: cetalSuppImg,
      ageRestriction: '8-12.9',
      weightRange: '8-12.9 kg'
    },
    // 300mg suppositories
    {
      id: 'abimol_300_supp',
      name: 'Abimol 300',
      ingredient: 'Paracetamol',
      concentration: 300,
      form: 'suppository',
      image: abimolSuppImg,
      ageRestriction: '19-30',
      weightRange: '19-30 kg'
    }
  ],
  diclofenac: [
    // 12.5mg suppositories (grouped together)
    {
      id: 'epifenac_12_5_supp_egypt',
      name: 'Epifenac 12.5',
      ingredient: 'Diclofenac',
      concentration: 12.5,
      form: 'suppository',
      image: epifenac12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 kg'
    },
    {
      id: 'dolphin_12_5_supp_egypt',
      name: 'Dolphin 12.5',
      ingredient: 'Diclofenac',
      concentration: 12.5,
      form: 'suppository',
      image: dolphin12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 kg'
    },
    // 25mg suppositories (grouped together)
    {
      id: 'epifenac_25_supp_egypt',
      name: 'Epifenac 25',
      ingredient: 'Diclofenac',
      concentration: 25,
      form: 'suppository',
      image: epifenac25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    },
    {
      id: 'dolphin_25_supp_egypt',
      name: 'Dolphin 25',
      ingredient: 'Diclofenac',
      concentration: 25,
      form: 'suppository',
      image: dolphin25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 kg'
    }
  ]
}
