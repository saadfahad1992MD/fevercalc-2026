// Indian Medications Database - English Version

// Real medication images
const placeholderImg = '/medications/placeholder.jpg'

export const medicationsIndiaEnglish = {
  paracetamol: [
    {
      id: 'crocin_drops',
      name: 'Crocin Baby Drops',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per 1ml
      volume: 1, // ml
      form: 'Drops',
      image: '/medications/crocin_baby_drops.png',
      ageRestriction: 'Infants'
    },
    {
      id: 'crocin_120',
      name: 'Crocin 120 Suspension',
      ingredient: 'Paracetamol',
      concentration: 120, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/crocin_120.png',
      ageRestriction: 'Up to 5 years'
    },
    {
      id: 'crocin_240',
      name: 'Crocin 240 Suspension',
      ingredient: 'Paracetamol',
      concentration: 240, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/crocin_240.png',
      ageRestriction: ''
    },
    {
      id: 'calpol_250',
      name: 'Calpol 250 Suspension',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/calpol_250.jpg',
      ageRestriction: ''
    },
    {
      id: 'dolo_syrup',
      name: 'Dolo Syrup',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/dolo_250.jpg',
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'ibugesic_syrup',
      name: 'Ibugesic Syrup',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/ibugesic_syrup.jpg',
      ageRestriction: '6 months and above'
    },
    {
      id: 'brufen_junior',
      name: 'Brufen Junior Suspension',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: '/medications/brufen_junior.webp',
      ageRestriction: '6 months and above'
    }
  ],
  combination: [
    {
      id: 'combiflam_suspension',
      name: 'Combiflam Suspension',
      ingredient: 'Ibuprofen + Paracetamol',
      concentration: 100, // mg Ibuprofen per 5ml
      concentration2: 162.5, // mg Paracetamol per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: placeholderImg,
      ageRestriction: '6 months and above',
      dualIngredient: true
    },
    {
      id: 'ibugesic_plus',
      name: 'Ibugesic Plus Syrup',
      ingredient: 'Ibuprofen + Paracetamol',
      concentration: 100, // mg Ibuprofen per 5ml
      concentration2: 162.5, // mg Paracetamol per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: placeholderImg,
      ageRestriction: '6 months and above',
      dualIngredient: true
    },
    {
      id: 'brufen_p_junior',
      name: 'Brufen P Junior',
      ingredient: 'Ibuprofen + Paracetamol',
      concentration: 100, // mg Ibuprofen per 5ml
      concentration2: 162.5, // mg Paracetamol per 5ml
      volume: 5, // ml
      form: 'Syrup',
      image: placeholderImg,
      ageRestriction: '6 months and above',
      dualIngredient: true
    }
  ],
  suppositories: {
    paracetamol: [
      {
        id: 'suppol_baby',
        name: 'Suppol Baby',
        ingredient: 'Paracetamol',
        concentration: 80, // mg
        form: 'suppository',
        image: '/medications/suppol_baby.jpg',
        weightRange: '6-10 kg',
        ageRestriction: 'Infants'
      },
      {
        id: 'suppol_child',
        name: 'Suppol Child',
        ingredient: 'Paracetamol',
        concentration: 170, // mg
        form: 'suppository',
        image: '/medications/suppol_child.jpg',
        weightRange: '11-15 kg',
        ageRestriction: 'Children'
      },
      {
        id: 'suppol_250',
        name: 'Suppol 250',
        ingredient: 'Paracetamol',
        concentration: 250, // mg
        form: 'suppository',
        image: '/medications/suppol_250.jpg',
        weightRange: '16-25 kg',
        ageRestriction: 'Older children'
      }
    ],
    diclofenac: [
      {
        id: 'jonac_12_5',
        name: 'Jonac 12.5',
        ingredient: 'Diclofenac',
        concentration: 12.5, // mg
        form: 'suppository',
        image: '/medications/jonac_12_5.jpg',
        weightRange: '10-15 kg',
        ageRestriction: 'For children over 1 year'
      },
      {
        id: 'jonac_25',
        name: 'Jonac 25',
        ingredient: 'Diclofenac',
        concentration: 25, // mg
        form: 'suppository',
        image: '/medications/jonac_25.jpg',
        weightRange: '15-20 kg',
        ageRestriction: 'For older children'
      }
    ]
  }
}
