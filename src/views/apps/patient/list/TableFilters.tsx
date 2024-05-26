// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'
import type { PatientType } from '@/types/models/patientTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

const TableFilters = ({ setData, tableData }: { setData: any; tableData?: PatientType[] }) => {
  // States
  const [status, setStatus] = useState<UsersType['status']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(user => {
      if (status && user.status !== status) return false

      return true
    })

    setData(filteredData)
  }, [status, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='deceased'>Deceased</MenuItem>
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
