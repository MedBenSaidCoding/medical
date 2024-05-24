import { NextResponse } from 'next/server'

import type { Patient } from '@/types/models/patientTypes'

export async function GET() {
  const data: Patient[] = []

  return NextResponse.json({ data: data })
}
