// Brazilian Fever Medications Database
// Paracetamol, Ibuprofen, and Dipirona (Novalgina) medications commonly available in Brazil

export const medicationsBrasil = {
  paracetamol: [
    {
      id: 'tylenol_bebe_drops',
      name: 'Tylenol Bebê Gotas',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml (100mg/ml)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/tylenol_bebe.jpg',
      ageRestriction: 'Para bebês 0-2 anos'
    },
    {
      id: 'tylenol_crianca',
      name: 'Tylenol Criança',
      ingredient: 'Paracetamol',
      concentration: 32, // mg per ml (32mg/ml as shown on package)
      volume: 1, // ml
      form: 'syrup',
      image: '/medications/brasil/tylenol_crianca.jpg',
      ageRestriction: ''
    },
    {
      id: 'paracetamol_ems_bebe',
      name: 'Paracetamol EMS Bebê',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml (100mg/ml baby version)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/paracetamol_ems_bebe.jpg',
      ageRestriction: 'Para bebês 0-2 anos'
    },
    {
      id: 'paracetamol_ems',
      name: 'Paracetamol EMS Gotas',
      ingredient: 'Paracetamol',
      concentration: 200, // mg per ml (200mg/ml as shown on package)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/paracetamol_ems.jpg',
      ageRestriction: ''
    },
    {
      id: 'paracetamol_vitamedic_bebe',
      name: 'Paracetamol Vitamedic Bebê',
      ingredient: 'Paracetamol',
      concentration: 100, // mg per ml (100mg/ml baby version)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/paracetamol_vitamedic_bebe.webp',
      ageRestriction: 'Para bebês 0-2 anos'
    },
    {
      id: 'paracetamol_vitamedic',
      name: 'Paracetamol Vitamedic Gotas',
      ingredient: 'Paracetamol',
      concentration: 140, // mg per ml (140mg/ml as shown on pharmacy website)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/paracetamol_vitamedic.jpg',
      ageRestriction: ''
    },
    {
      id: 'paracetamol_ache',
      name: 'Paracetamol Aché',
      ingredient: 'Paracetamol',
      concentration: 200, // mg per ml (200mg/ml as shown on package)
      volume: 1, // ml
      form: 'drops',
      image: '/medications/brasil/paracetamol_ache.jpg',
      ageRestriction: ''
    }
  ],
  ibuprofen: [
    {
      id: 'alivium',
      name: 'Alivium',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml (20mg/ml)
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/brasil/alivium.jpg',
      ageRestriction: 'Idade acima de 6 meses',
      minAgeMonths: 6
    },
    {
      id: 'ibuprofeno_cimed',
      name: 'Ibuprofeno Cimed',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/brasil/ibuprofeno_cimed.jpg',
      ageRestriction: 'Idade acima de 6 meses',
      minAgeMonths: 6
    },
    {
      id: 'ibuprofeno_medley',
      name: 'Ibuprofeno Medley',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/brasil/ibuprofeno_medley.jpg',
      ageRestriction: 'Idade acima de 6 meses',
      minAgeMonths: 6
    },
    {
      id: 'ibuprofeno_geolab',
      name: 'Ibuprofeno Geolab',
      ingredient: 'Ibuprofen',
      concentration: 100, // mg per 5ml
      volume: 5, // ml
      form: 'syrup',
      image: '/medications/brasil/ibuprofeno_geolab.jpg',
      ageRestriction: 'Idade acima de 6 meses',
      minAgeMonths: 6
    }
  ],
  paracetamolSuppositories: [
    {
      id: 'paracetamol_supp_125',
      name: 'Paracetamol 125mg',
      ingredient: 'Paracetamol',
      concentration: 125, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/paracetamol_supp_125.jpg',
      ageRestriction: ''
    },
    {
      id: 'paracetamol_supp_250',
      name: 'Paracetamol 250mg',
      ingredient: 'Paracetamol',
      concentration: 250, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/paracetamol_supp_250.jpg',
      ageRestriction: ''
    },
    {
      id: 'paracetamol_supp_350',
      name: 'Paracetamol 350mg',
      ingredient: 'Paracetamol',
      concentration: 350, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/paracetamol_supp_350.jpg',
      ageRestriction: ''
    }
  ],
  dipironaSuppositories: [
    {
      id: 'novalgina_supp_300',
      name: 'Novalgina Supositório 300mg',
      ingredient: 'Dipirona',
      concentration: 300, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/novalgina_supp_300.jpg',
      ageRestriction: 'Para crianças acima de 1 ano',
      minAgeMonths: 12
    },
    {
      id: 'novalgina_supp_500',
      name: 'Novalgina Supositório 500mg',
      ingredient: 'Dipirona',
      concentration: 500, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/novalgina_supp_500.jpg',
      ageRestriction: 'Para crianças acima de 1 ano',
      minAgeMonths: 12
    }
  ],
  diclofenacSuppositories: [
    {
      id: 'voltaren_supp_12_5',
      name: 'Voltaren 12.5mg',
      ingredient: 'Diclofenac',
      concentration: 12.5, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/voltaren_12_5.jpg',
      ageRestriction: 'Para crianças acima de 1 ano',
      minAgeMonths: 12
    },
    {
      id: 'voltaren_supp_25',
      name: 'Voltaren 25mg',
      ingredient: 'Diclofenac',
      concentration: 25, // mg per suppository
      volume: 1,
      form: 'suppository',
      image: '/medications/brasil/voltaren_25.jpg',
      ageRestriction: 'Para crianças acima de 1 ano',
      minAgeMonths: 12
    }
  ]
}
