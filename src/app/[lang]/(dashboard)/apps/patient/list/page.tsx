// Component Imports
import { cookies } from 'next/headers'

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'

import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'

import useSupabaseServer from '@/utils/supabase/supabase-server'

import PatientList from '@views/apps/patient/list'
import { getAllPatients } from '@/data/queries/patientQueries'

const PatientListApp = async () => {
  const queryClient = new QueryClient()
  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)

  await prefetchQuery(queryClient, getAllPatients(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PatientList />
    </HydrationBoundary>
  )
}

export default PatientListApp
