import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '@/types/models/database.types'

export type TypedSupabaseClient = SupabaseClient<Database>
