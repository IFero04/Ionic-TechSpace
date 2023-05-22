import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Morada } from '../models/morada.module';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoradasService {
  private supabaseCliente: SupabaseClient;
  private moradas: Morada[] = [];
  private user: User = {} as User;

  moradasSubject: Subject<Morada[]> = new Subject<Morada[]>();

  constructor(private supabaseservice: SupabaseService, private userservice: UserService) { 
    this.supabaseCliente = supabaseservice.getBD();
    this.user = this.userservice.getUser();
    this.moradas = [];
    this.init();
  }

  async init() {
    const moradasUser = await this.getMoradasBD();
    if ( moradasUser ) {
      this.moradas = moradasUser;
    }
    this.notifyMoradasChange();
  }

  async getMoradasBD(): Promise<Morada[]> {
    const {data, error} = await this.supabaseCliente
    .from('address')
    .select('*')
    .eq('id_user', this.user.id)
    .order('id', {ascending: true})

    if (error) {
      throw new Error('Erro ao obter as moradas.');
    }

    return data as Morada[];
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

    this.notifyMoradasChange();

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

    this.notifyMoradasChange();
  }

  async deleteMorada(id: number): Promise<void> {
    const index = this.moradas.findIndex(t => t.id === id);
    if (index >= 0) {
      this.moradas.splice(index, 1);
    }

    await this.supabaseCliente.from('address').delete().eq('id', id);

    this.notifyMoradasChange();
  }

  private notifyMoradasChange() {
    this.moradasSubject.next(this.moradas);
  }

  getMoradas(): Morada[] {
    return this.moradas;
  }
}
