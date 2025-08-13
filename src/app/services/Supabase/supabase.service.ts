import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Create Supabase client without using persistent session
    this.supabase = createClient(
      'https://uwublxgwpzzzfkkawjxz.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3dWJseGd3cHp6emZra2F3anh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTg5NTQsImV4cCI6MjA3MDU3NDk1NH0.cyVb5SDo9Y6XRRZFVJZPekjuZXVECYomJe5odKSTJlM',
      {
        auth: {
          autoRefreshToken: false, // Prevents background refresh locks
          persistSession: false,   // Avoids using storage locks
          detectSessionInUrl: false // Skips URL hash parsing
        }
      }
    );
  }

  async sendOtp(phone: string) {
    try {
      return await this.supabase.auth.signInWithOtp({
        phone,
        options: { channel: 'sms' }
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }

  async verifyOtp(phone: string, token: string) {
    try {
      return await this.supabase.auth.verifyOtp({
        phone,
        token,
        type: 'sms'
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  }
}
