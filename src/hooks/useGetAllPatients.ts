import { useQuery } from '@tanstack/react-query'

import { getAllPatients } from '@/data/queries/patientQueries'
import type { TypedSupabaseClient } from '@/types/utilsTypes'

function useGetAllPatients(client: TypedSupabaseClient) {
  const queryKey = ['allPatients']

  const queryFn = async () => {
    return getAllPatients(client).then(res => res.data)
  }

  return useQuery({ queryKey, queryFn })
}

export default useGetAllPatients
