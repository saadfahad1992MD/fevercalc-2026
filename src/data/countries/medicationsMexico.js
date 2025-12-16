// Mexican Fever Medications Database - Spanish Version
// Medicamentos para la fiebre disponibles en México

export const medicationsMexico = {
  paracetamol: [
    // TEMPRA BRAND
    {
      id: 'tempra-jarabe',
      name: 'Tempra Jarabe Infantil',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '3.2g/100ml', // What's shown on package
      form: 'Jarabe',
      image: '/medications/mexico/tempra-jarabe.jpg',
      ageRestriction: '2-11 años'
    },
    {
      id: 'tempra-gotas',
      name: 'Tempra Solución Pediátrica',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Gotas',
      image: '/medications/mexico/tempra-gotas.jpg',
      ageRestriction: '0-36 meses'
    },
    // TYLENOL BRAND
    {
      id: 'tylenol-infantil',
      name: 'Tylenol Suspensión Infantil',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '3.2g/100ml', // What's shown on package
      form: 'Jarabe',
      image: '/medications/mexico/tylenol-infantil.jpg',
      ageRestriction: '2-12 años'
    },
    {
      id: 'tylenol-pediatrico',
      name: 'Tylenol Suspensión Pediátrica',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Gotas',
      image: '/medications/mexico/tylenol-pediatrico.jpg',
      ageRestriction: '0-24 meses'
    },
    // GENERIC BRANDS
    {
      id: 'paracetamol-jarabe-generico',
      name: 'Paracetamol Jarabe Infantil (Genérico)',
      ingredient: 'Paracetamol',
      concentration: 160, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '3.2g/100ml', // What's shown on package
      form: 'Jarabe',
      image: '/medications/mexico/tempra-jarabe.jpg',
      ageRestriction: '2-11 años',
      note: 'Similares, del Ahorro, Pharmalife, Benavides'
    },
    {
      id: 'paracetamol-gotas-generico',
      name: 'Paracetamol Solución Pediátrica (Genérico)',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml
      volume: 1, // ml
      form: 'Gotas',
      image: '/medications/mexico/tempra-gotas.jpg',
      ageRestriction: '0-36 meses',
      note: 'Similares, del Ahorro, Pharmalife, Benavides'
    },
  ],
  ibuprofen: [
    // MOTRIN BRAND
    {
      id: 'motrin-infantil',
      name: 'Motrin Suspensión Infantil',
      ingredient: 'Ibuprofeno',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '2g/100ml', // What's shown on package
      form: 'Suspensión',
      image: '/medications/mexico/motrin-infantil.jpg',
      ageRestriction: '2-12 años'
    },
    {
      id: 'motrin-pediatrico',
      name: 'Motrin Suspensión Pediátrica',
      ingredient: 'Ibuprofeno',
      concentration: 40, // mg per ml
      volume: 1, // ml
      form: 'Gotas',
      image: '/medications/mexico/motrin-pediatrico.jpg',
      ageRestriction: '6-24 meses'
    },
    // TEMPRA FEN BRAND
    {
      id: 'temprafen-infantil',
      name: 'Tempra Fen Suspensión Infantil',
      ingredient: 'Ibuprofeno',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '2g/100ml', // What's shown on package
      form: 'Suspensión',
      image: '/medications/mexico/motrin-infantil.jpg',
      ageRestriction: '2-12 años'
    },
    // GENERIC BRANDS
    {
      id: 'ibuprofeno-suspension-generico',
      name: 'Ibuprofeno Suspensión Infantil (Genérico)',
      ingredient: 'Ibuprofeno',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      packageConcentration: '2g/100ml', // What's shown on package
      form: 'Suspensión',
      image: '/medications/mexico/motrin-infantil.jpg',
      ageRestriction: '2-12 años',
      note: 'Similares, del Ahorro'
    },
    {
      id: 'ibuprofeno-gotas-generico',
      name: 'Ibuprofeno Suspensión Pediátrica (Genérico)',
      ingredient: 'Ibuprofeno',
      concentration: 40, // mg per ml
      volume: 1, // ml
      form: 'Gotas',
      image: '/medications/mexico/motrin-pediatrico.jpg',
      ageRestriction: '6-24 meses',
      note: 'Similares, del Ahorro'
    },
  ],
  suppositories: {
    paracetamol: [
      {
        id: 'tempra-supp-80',
        name: 'Tempra Supositorio 80mg',
        ingredient: 'Paracetamol',
        concentration: 80, // mg per suppository
        form: 'supositorio',
        image: '/medications/mexico/tempra-supp-100.jpg',
        weightRange: '5-9 kg',
        ageRange: '1-12 meses',
        ageRestriction: 'Para bebés'
      },
      {
        id: 'tempra-supp-150',
        name: 'Tempra Supositorio 150mg',
        ingredient: 'Paracetamol',
        concentration: 150, // mg per suppository
        form: 'supositorio',
        image: '/medications/mexico/tempra-supp-150.jpg',
        weightRange: '9-15 kg',
        ageRange: '1-3 años',
        ageRestriction: 'Para niños pequeños'
      },
      {
        id: 'paracetamol-supp-300',
        name: 'Paracetamol Supositorio 300mg',
        ingredient: 'Paracetamol',
        concentration: 300, // mg per suppository
        form: 'supositorio',
        image: '/medications/mexico/tempra-supp-300.jpg',
        weightRange: '16-30 kg',
        ageRange: '3-12 años',
        ageRestriction: 'Para niños mayores',
        note: 'Piremol, Marca del Ahorro, Similares'
      }
    ],
    diclofenac: []
  }
}
