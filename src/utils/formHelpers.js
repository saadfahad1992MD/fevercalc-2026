// Generate weight options with variable increments
export const generateWeightOptions = () => {
  const options = []
  
  // 1-15 kg: Every 0.5 kg (precision for infants)
  for (let i = 1; i <= 15; i += 0.5) {
    options.push(i)
  }
  
  // 15-30 kg: Every 1 kg
  for (let i = 16; i <= 30; i++) {
    options.push(i)
  }
  
  // 30-60 kg: Every 2 kg
  for (let i = 32; i <= 60; i += 2) {
    options.push(i)
  }
  
  return options
}

// Generate month options (0-12)
export const generateMonthOptions = () => {
  return Array.from({ length: 13 }, (_, i) => i) // 0-12
}

// Generate year options (1-14)
export const generateYearOptions = () => {
  return Array.from({ length: 14 }, (_, i) => i + 1) // 1-14
}

// Common weight quick-select values
export const commonWeights = [5, 7, 10, 12, 15, 20, 25, 30]
