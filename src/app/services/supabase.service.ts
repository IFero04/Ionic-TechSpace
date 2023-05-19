import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  private supabaseURL = "https://duubbvaoftalklzowkny.supabase.co";
  private supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1dWJidmFvZnRhbGtsem93a255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ0OTM1ODEsImV4cCI6MjAwMDA2OTU4MX0.Sw5_ghY0lL-Fu489uwoqUWs1UX1CvGtLV-subXDpW2Y";
  private supabaseClient: SupabaseClient;

  constructor() { 
    this.supabaseClient = createClient(this.supabaseURL, this.supabaseKey);
  }

  getBD(): SupabaseClient {
    return this.supabaseClient;
  } 
}
