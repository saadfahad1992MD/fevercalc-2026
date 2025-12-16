// Indonesia Pediatric Medications Database
// Paracetamol and Ibuprofen medications commonly available in Indonesia

// Real Indonesian medication images
const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3EMedication%3C/text%3E%3C/svg%3E'

export const medicationsIndonesia = {
  paracetamol: [
    {
      id: 'tempra_drops',
      name: 'Tempra Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'drops',
      image: '/medications/indonesia/tempra_drops.jpg',
      ageRestriction: 'For infants 0-12 months'
    },
    {
      id: 'sanmol_120',
      name: 'Sanmol Sirup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/sanmol_sirup.jpg',
      ageRestriction: ''
    },
    {
      id: 'panadol_120',
      name: 'Panadol Anak Sirup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/panadol_anak.jpg',
      ageRestriction: ''
    },
    {
      id: 'tempra_120',
      name: 'Tempra Sirup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/tempra_forte.png',
      ageRestriction: ''
    },
    {
      id: 'biogesic_120',
      name: 'Biogesic Anak',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/biogesic_anak.png',
      ageRestriction: ''
    },
    {
      id: 'termorex_120',
      name: 'Termorex Sirup',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/termorex_sirup.jpg',
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'proris_100',
      name: 'Proris Suspensi',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/proris_suspensi.jpg',
      ageRestriction: 'For children 6 months and above'
    },
    {
      id: 'proris_forte_200',
      name: 'Proris Forte',
      ingredient: 'Ibuprofen',
      concentration: 200, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/proris_forte.jpg',
      ageRestriction: 'For older children'
    },
    {
      id: 'hufagripp_100',
      name: 'Hufagripp TMP',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/indonesia/hufagripp_tmp.jpg',
      ageRestriction: 'For children 6 months and above'
    }
  ],
  suppositories: {
    paracetamol: [],
    diclofenac: []
  }
}
