import { Database } from './supabase';

export type Event = Database['public']['Tables']['events']['Row'];
export type NearbyEvent = Database['public']['Functions']['nearby_events']['Returns'];
export type User = Database['public']['Tables']['profiles'];
export type Attendees = Database['public']['Tables']['attendees'];
