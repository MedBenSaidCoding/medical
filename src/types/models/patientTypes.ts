export type PatientType = {
  id: string // Unique identifier for the patient
  firstName: string // Patient's first name
  fullName: string // Patient's full name
  lastName: string // Patient's last name
  status: string // Patient's current status
  dateOfBirth: string // Patient's date of birth
  street: string | null
  city: string | null
  zipCode: string | null // Patient's home address
  phoneNumber: string // Patient's contact number
  email: string | null // Patient's email address
  medicalHistory: string[] | null // Array of patient's past medical conditions
  currentMedications: string[] | null // Array of patient's current medications
  avatar: string | null // URL to patient's profile picture
}
