// Egypt-specific medication data with real Egyptian product images

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

export const medicationsEgypt = {
  paracetamol: [
    {
      id: 'cetal_drops',
      name: 'سيتال نقط',
      ingredient: 'باراسيتامول',
      concentration: 100, // mg per 1ml
      volume: 1, // ml
      form: 'قطرات',
      image: cetalDropsImg,
      ageRestriction: 'عمر سنتين و أقل'
    },
    {
      id: 'cetal_syrup',
      name: 'سيتال شراب',
      ingredient: 'باراسيتامول',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: cetalSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'abimol_syrup',
      name: 'أبيمول شراب',
      ingredient: 'باراسيتامول',
      concentration: 150, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: abimolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'paramol_syrup',
      name: 'بارامول شراب',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: paramolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'peral_syrup',
      name: 'بيرال شراب',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: peralSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'tempra_drops',
      name: 'تمبرا نقط',
      ingredient: 'باراسيتامول',
      concentration: 100, // mg per 1ml
      volume: 1, // ml
      form: 'قطرات',
      image: tempraDropsImg,
      ageRestriction: 'عمر سنتين و أقل'
    },
    {
      id: 'tempra_syrup',
      name: 'تمبرا شراب',
      ingredient: 'باراسيتامول',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: tempraSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-baby-egypt',
      name: 'بانادول',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: panadolBabySuspensionImg,
      ageRestriction: ''
    },
    {
      id: 'panadol-pink-egypt',
      name: 'بانادول',
      ingredient: 'باراسيتامول',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: panadolPinkImg,
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'brufen_egypt',
      name: 'بروفين',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: brufenImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'profinal_egypt',
      name: 'بروفينال',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: profinalSyrupImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'nurofen_egypt',
      name: 'نيوروفين',
      ingredient: 'آيبوبروفين',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: nurofenSyrupImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    },
    {
      id: 'ibuflam_egypt',
      name: 'ايبوفلام',
      ingredient: 'آيبوبروفين',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'شراب',
      image: ibuflamSyrupImg,
      ageRestriction: 'العمر أكبر من 6 أشهر'
    }
  ]
}

export const suppositoriesEgypt = {
  paracetamol: [
    // 120mg suppositories
    {
      id: 'cetal_120_supp',
      name: 'سيتال 120',
      ingredient: 'باراسيتامول',
      concentration: 120,
      form: 'تحميلة',
      image: cetalSuppImg,
      ageRestriction: '8-12.9',
      weightRange: '8-12.9 كيلوغرام'
    },
    // 300mg suppositories
    {
      id: 'abimol_300_supp',
      name: 'أبيمول 300',
      ingredient: 'باراسيتامول',
      concentration: 300,
      form: 'تحميلة',
      image: abimolSuppImg,
      ageRestriction: '19-30',
      weightRange: '19-30 كيلوغرام'
    }
  ],
  diclofenac: [
    // 12.5mg suppositories (grouped together)
    {
      id: 'epifenac_12_5_supp_egypt',
      name: 'إبيفيناك 12.5',
      ingredient: 'ديكلوفيناك',
      concentration: 12.5,
      form: 'تحميلة',
      image: epifenac12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 كيلوغرام'
    },
    {
      id: 'dolphin_12_5_supp_egypt',
      name: 'دولفين 12.5',
      ingredient: 'ديكلوفيناك',
      concentration: 12.5,
      form: 'تحميلة',
      image: dolphin12_5SuppImg,
      ageRestriction: '8-16',
      weightRange: '8-16 كيلوغرام'
    },
    // 25mg suppositories (grouped together)
    {
      id: 'epifenac_25_supp_egypt',
      name: 'إبيفيناك 25',
      ingredient: 'ديكلوفيناك',
      concentration: 25,
      form: 'تحميلة',
      image: epifenac25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 كيلوغرام'
    },
    {
      id: 'dolphin_25_supp_egypt',
      name: 'دولفين 25',
      ingredient: 'ديكلوفيناك',
      concentration: 25,
      form: 'تحميلة',
      image: dolphin25SuppImg,
      ageRestriction: '17-25',
      weightRange: '17-25 كيلوغرام'
    }
  ]
}
