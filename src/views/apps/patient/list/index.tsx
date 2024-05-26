'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

import { useQuery } from '@supabase-cache-helpers/postgrest-react-query'

// Type Imports
import type { PatientType } from '@/types/models/patientTypes'

// Component Imports
import PatientListTable from './PatientListTable'
import UserListCards from './UserListCards'
import useSupabaseBrowser from '@/utils/supabase/supabase-browser'

import { getAllPatients } from '@/data/queries/patientQueries'

const UserList = () => {
  const supabase = useSupabaseBrowser()

  const { data: data, isLoading: isLoading, isError: isError } = useQuery(getAllPatients(supabase))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !data) {
    return <div>Error</div>
  }

  const patients = (data as PatientType[]) || []

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <UserListCards />
      </Grid>
      <Grid item xs={12}>
        <PatientListTable tableData={patients} />
      </Grid>
    </Grid>
  )
}

export default UserList
