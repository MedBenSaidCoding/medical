import { NextResponse } from 'next/server'

import { cookies } from 'next/headers'

import { QueryClient } from '@tanstack/react-query'

import { prefetchQuery } from '@supabase-cache-helpers/postgrest-react-query'

import type { QueryData } from '@supabase/supabase-js'

import useSupabaseServer from '@/utils/supabase/supabase-server'

import { getAllPatients } from '@/data/queries/patientQueries'

export async function GET() {
  const queryClient = new QueryClient()

  const cookieStore = cookies()
  const supabase = useSupabaseServer(cookieStore)

  await prefetchQuery(queryClient, getAllPatients(supabase))

  const allPatientsQuery = getAllPatients(supabase)

  type CountriesWithCities = QueryData<typeof allPatientsQuery>

  const { data, error } = await allPatientsQuery

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data as CountriesWithCities, { status: 200 })
}
