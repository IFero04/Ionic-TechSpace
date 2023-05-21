import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Morada } from '../models/morada.module';

@Injectable({
  providedIn: 'root'
})
export class MoradasService {
  private supabaseCliente: SupabaseClient;
  private moradas: Morada[];

  constructor(private supabaseservice: SupabaseService) { 
    this.supabaseCliente = supabaseservice.getBD();
    this.moradas = [];
  }

  getMoradas(): Morada[] {
    return this.moradas;
  }

  async init() {
    
  }

  async insertMorada(morada: Morada, userId: number) {
    this.moradas.push(morada);
    if (!morada.id) {
      morada.id = Date.now();
    }

    const {data, error} = await this.supabaseCliente
      .from('address')
      .insert([{ ...morada, id_user: userId}])
      .single()

    if (error) {
      throw error;
    }

    return data;
  }

  async updateMorada(morada: Morada): Promise<void> {
    const index = this.moradas.findIndex(t => t.id === morada.id);
    if (index >= 0) {
      this.moradas[index] = morada;
    }

    const {data, error} = await this.supabaseCliente
      .from('address')
      .update({
        name: morada.name,
        NIF: morada.NIF,
        address: morada.address,
        cod_postal: morada.cod_postal,
      })
      .eq('id', morada.id);

    if (error) {
      throw new Error('Erro ao atualizar utilizador');
    }

  }

  async deleteMorada(id: number): Promise<void> {
    const index = this.moradas.findIndex(t => t.id === id);
    if (index >= 0) {
      this.moradas.splice(index, 1);
    }

    await this.supabaseCliente.from('address').delete().eq('id', id);
  }
}
