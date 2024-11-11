import { Database } from './supabase';

export type Event = Database['public']['Tables']['events']['Row'];
export type User = Database['public']['Tables']['profiles'];
export type Attendees = Database['public']['Tables']['attendees'];
