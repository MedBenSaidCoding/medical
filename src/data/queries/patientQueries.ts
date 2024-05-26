import type { PatientType } from '@/types/models/patientTypes'
import type { TypedSupabaseClient } from '@/types/utilsTypes'

export function getAllPatients(client: TypedSupabaseClient) {
  return client
    .from('patients')
    .select()

    .throwOnError()
}

export function getPatientById(client: TypedSupabaseClient, id: string) {
  return client
    .from('patients')
    .select(
      `
      id,
      firstName,
      lastName
    `
    )
    .eq('id', id)
    .throwOnError()
    .single()
}

export function insertPatient(client: TypedSupabaseClient, data: PatientType) {
  return client.from('patients').insert(data).throwOnError()
}

export function updatePatient(client: TypedSupabaseClient, id: string, data: Partial<PatientType>) {
  return client.from('patients').update(data).eq('id', id).throwOnError()
}
