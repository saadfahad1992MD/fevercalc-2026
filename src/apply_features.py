import re

# Read the file
with open('App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace MedicationCard function to add all validation logic
old_medication_card = r'  const MedicationCard = \({ medication, category }\) => \('
new_medication_card = '''  const MedicationCard = ({ medication, category }) => {
    // Check if medication is Ibuprofen and age is under 6 months
    const isIbuprofen = medication.ingredient === 'Ibuprofen'
    const ageInMonths = ageUnit === 'years' ? parseFloat(age) * 12 : parseFloat(age)
    const isUnder6Months = age && ageUnit && ageInMonths < 6
    
    // Check if suppository is suitable for current age/weight
    let isSuppositoryUnsuitable = false
    let unsuitabilityReason = ''
    
    if (medication.form === 'تحميلة' && age && ageUnit && weight) {
      const weightNum = parseFloat(weight)
      
      if (medication.ingredient === 'Paracetamol') {
        const weightRange = medication.weightRange
        if (weightRange) {
          const weightMatch = weightRange.match(/(\\d+(?:\\.\\d+)?)-(\\d+(?:\\.\\d+)?)/)
          if (weightMatch) {
            const minWeight = parseFloat(weightMatch[1])
            const maxWeight = parseFloat(weightMatch[2])
            if (weightNum < minWeight || weightNum > maxWeight) {
              isSuppositoryUnsuitable = true
              unsuitabilityReason = `مناسب للوزن ${weightRange} كجم`
            }
          }
        }
      }
      
      if (medication.ingredient === 'Diclofenac') {
        if (ageInMonths < 12) {
          isSuppositoryUnsuitable = true
          unsuitabilityReason = 'مناسب للأطفال أكبر من سنة'
        } else {
          if (weightNum >= 8 && weightNum <= 16) {
            if (medication.concentration !== 12.5) {
              isSuppositoryUnsuitable = true
              unsuitabilityReason = 'مناسب للوزن 8-16 كجم'
            }
          } else if (weightNum >= 17 && weightNum <= 25) {
            if (medication.concentration !== 25) {
              isSuppositoryUnsuitable = true
              unsuitabilityReason = 'مناسب للوزن 17-25 كجم'
            }
          } else {
            isSuppositoryUnsuitable = true
            unsuitabilityReason = 'مناسب للوزن 8-25 كجم'
          }
        }
      }
    }
    
    const isDisabled = (isIbuprofen && isUnder6Months) || isSuppositoryUnsuitable

    const handleClick = () => {
      // Check if age and weight are entered
      if (!age || !ageUnit || !weight) {
        alert('⚠️ يرجى إدخال العمر والوزن أولاً')
        return
      }
      
      if (isSuppositoryUnsuitable) {
        alert(`⚠️ تنبيه: هذا اللبوس غير مناسب لطفلك\\n${unsuitabilityReason}`)
        return
      }
      
      if (isIbuprofen && isUnder6Months) {
        alert('⚠️ تنبيه: أدوية الإيبوبروفين مناسبة للأطفال من عمر 6 أشهر فما فوق فقط')
        return
      }
      setSelectedMedication(medication)
    }

    return ('''

content = re.sub(old_medication_card, new_medication_card, content)

# 2. Replace onClick in Card
content = re.sub(
    r'onClick=\{\(\) => setSelectedMedication\(medication\)\}',
    'onClick={handleClick}\n      style={isDisabled ? { opacity: 0.5, cursor: \'not-allowed\' } : {}}',
    content
)

# 3. Add warning badges after ageRestriction
age_restriction_section = r'(\s+{medication\.ageRestriction && \(\s+<p className="text-xs text-blue-600 font-medium mt-1">\s+{medication\.ageRestriction}\s+</p>\s+\)}\s+)(</div>)'

warning_badges = r'''\1{(isIbuprofen && isUnder6Months) && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ للأطفال من 6 أشهر فما فوق
              </p>
            )}
            {isSuppositoryUnsuitable && (
              <p className="text-xs text-red-600 font-bold mt-1 bg-red-50 px-2 py-1 rounded">
                ⚠️ {unsuitabilityReason}
              </p>
            )}
          \2'''

content = re.sub(age_restriction_section, warning_badges, content, flags=re.DOTALL)

# Write back
with open('App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Features applied to Arabic version")
