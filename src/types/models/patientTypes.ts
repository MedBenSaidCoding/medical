export type Patient = {
  id: string // Unique identifier for the patient
  firstName: string // Patient's first name
  lastName: string // Patient's last name
  dateOfBirth: Date // Patient's date of birth
  address: {
    street: string
    city: string
    zipCode: string
  } | null // Patient's home address
  phoneNumber: string // Patient's contact number
  email: string | null // Patient's email address
  medicalHistory: string[] | null // Array of patient's past medical conditions
  currentMedications: string[] | null // Array of patient's current medications
}
