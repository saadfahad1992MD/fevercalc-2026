// Nigeria Pediatric Medications Database
// Paracetamol and Ibuprofen medications commonly available in Nigeria

// Import actual product images
import emzorParacetamolDropsImg from '@/assets/medications/nigeria/emzor_paracetamol_drops.png'
import emzorParacetamolSyrupImg from '@/assets/medications/nigeria/emzor_paracetamol_syrup.png'
import emcapParacetamolImg from '@/assets/medications/nigeria/emcap_paracetamol.png'
import panadolChildrenImg from '@/assets/medications/nigeria/panadol_children.jpg'
import mbParacetamolImg from '@/assets/medications/nigeria/mb_paracetamol.jpg'
import emprofenImg from '@/assets/medications/nigeria/emprofen.png'
import mbIbuprofenImg from '@/assets/medications/nigeria/mb_ibuprofen.png'
import nurofenChildrenImg from '@/assets/medications/nigeria/nurofen_children.jpeg'
import calprofenImg from '@/assets/medications/nigeria/calprofen.jpg'

// Suppository images
import feverall80mgImg from '@/assets/medications/nigeria/feverall_80mg.jpg'
import feverall120mgImg from '@/assets/medications/nigeria/feverall_120mg.jpeg'
import amidolSuppImg from '@/assets/medications/nigeria/amidol_suppository.png'
import voltaren12_5mgImg from '@/assets/medications/nigeria/voltaren_12_5mg.jpg'
import voltaren25mgImg from '@/assets/medications/nigeria/voltaren_25mg.webp'

// Placeholder images for medications without photos
const paracetamolPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%234CAF50" width="200" height="200" rx="10"/%3E%3Ctext x="50%25" y="45%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold" fill="white"%3EParacetamol%3C/text%3E%3Ctext x="50%25" y="65%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="white"%3ENigeria%3C/text%3E%3C/svg%3E';

export const medicationsNigeria = {
  paracetamol: [
    {
      id: 'emzor_paracetamol_drops',
      name: 'Emzor Paracetamol Drops',
      ingredient: 'Paracetamol',
      concentration: 100,
      volume: 1,
      form: 'drops',
      image: emzorParacetamolDropsImg,
      ageRestriction: 'For infants 0-12 months'
    },
    {
      id: 'emzor_paracetamol_syrup',
      name: 'Emzor Paracetamol Syrup',
      ingredient: 'Paracetamol',
      concentration: 120,
      volume: 5,
      form: 'syrup',
      image: emzorParacetamolSyrupImg,
      ageRestriction: ''
    },
    {
      id: 'emcap_paracetamol',
      name: 'Emcap Paracetamol',
      ingredient: 'Paracetamol',
      concentration: 120,
      volume: 5,
      form: 'syrup',
      image: emcapParacetamolImg,
      ageRestriction: ''
    },
    {
      id: 'panadol_children',
      name: 'Panadol Children',
      ingredient: 'Paracetamol',
      concentration: 120,
      volume: 5,
      form: 'syrup',
      image: panadolChildrenImg,
      ageRestriction: ''
    },
    {
      id: 'mb_paracetamol',
      name: 'M&B Paracetamol',
      ingredient: 'Paracetamol',
      concentration: 120,
      volume: 5,
      form: 'syrup',
      image: mbParacetamolImg,
      ageRestriction: ''
    },
    {
      id: 'acepol_paracetamol',
      name: 'Acepol',
      ingredient: 'Paracetamol',
      concentration: 120,
      volume: 5,
      form: 'syrup',
      image: paracetamolPlaceholder,
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'emprofen',
      name: 'Emprofen',
      ingredient: 'Ibuprofen',
      concentration: 100,
      volume: 5,
      form: 'syrup',
      image: emprofenImg,
      ageRestriction: 'For children 6 months and above'
    },
    {
      id: 'mb_ibuprofen',
      name: 'M&B Ibuprofen',
      ingredient: 'Ibuprofen',
      concentration: 100,
      volume: 5,
      form: 'syrup',
      image: mbIbuprofenImg,
      ageRestriction: 'For children 6 months and above'
    },
    {
      id: 'nurofen_children',
      name: 'Nurofen for Children',
      ingredient: 'Ibuprofen',
      concentration: 100,
      volume: 5,
      form: 'syrup',
      image: nurofenChildrenImg,
      ageRestriction: 'For children 6 months to 9 years'
    },
    {
      id: 'calprofen',
      name: 'Calprofen',
      ingredient: 'Ibuprofen',
      concentration: 100,
      volume: 5,
      form: 'syrup',
      image: calprofenImg,
      ageRestriction: 'For children 6 months and above'
    }
  ],
  suppositories: {
    paracetamol: [
      {
        id: 'feverall_80mg',
        name: 'FeverAll Infants 80mg',
        ingredient: 'Paracetamol',
        concentration: 80,
        form: 'suppository',
        image: feverall80mgImg,
        ageRestriction: '6-11',
        weightRange: '6-11 months'
      },
      {
        id: 'feverall_120mg',
        name: 'FeverAll Children 120mg',
        ingredient: 'Paracetamol',
        concentration: 120,
        form: 'suppository',
        image: feverall120mgImg,
        ageRestriction: '3-6',
        weightRange: '3-6 years'
      },
      {
        id: 'amidol_125mg',
        name: 'Amidol 125mg',
        ingredient: 'Paracetamol',
        concentration: 125,
        form: 'suppository',
        image: amidolSuppImg,
        ageRestriction: '1-3',
        weightRange: '10-15 kg'
      },
      {
        id: 'amidol_250mg',
        name: 'Amidol 250mg',
        ingredient: 'Paracetamol',
        concentration: 250,
        form: 'suppository',
        image: amidolSuppImg,
        ageRestriction: '4-12',
        weightRange: '16-40 kg'
      }
    ],
    diclofenac: [
      {
        id: 'voltaren_12_5mg',
        name: 'Voltaren 12.5mg',
        ingredient: 'Diclofenac',
        concentration: 12.5,
        form: 'suppository',
        image: voltaren12_5mgImg,
        ageRestriction: '1-12',
        weightRange: 'For children 1-12 years'
      },
      {
        id: 'voltaren_25mg',
        name: 'Voltaren 25mg',
        ingredient: 'Diclofenac',
        concentration: 25,
        form: 'suppository',
        image: voltaren25mgImg,
        ageRestriction: '6+',
        weightRange: 'For children over 6 years'
      }
    ]
  }
}
