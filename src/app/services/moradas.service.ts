import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Morada } from '../models/morada.module';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoradasService {
  private supabaseClient: SupabaseClient;

  private user: User;
  userSubscription: Subscription;

  private moradas: Morada[] = [];
  moradasSubject: BehaviorSubject<Morada[]>;


  constructor(private supabaseService: SupabaseService, private userService: UserService) { 
    this.supabaseClient = supabaseService.getBD();
    this.user = {} as User;
    this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
      this.user = user;
    });
    this.moradas = [];
    this.moradasSubject = new BehaviorSubject<Morada[]>(this.moradas);
    this.init();
  }

  async init() {
    const moradasUser = await this.getMoradasBD();
    if ( moradasUser ) {
      this.moradas = moradasUser;
    }
    this.notifyMoradasChange();
  }

  // CRUD //

  async getMoradasBD(): Promise<Morada[]> {
    if (this.user.id) {
      const {data, error} = await this.supabaseClient
      .from('address')
      .select('*')
      .eq('id_user', this.user.id)
      .order('id', {ascending: true})

      if (error) {
        throw new Error('Erro ao obter as moradas.');
      }

      return data as Morada[];
    }
    
    return [];
  }

  async insertMorada(address: Morada) {
    if (!address.id) {
      address.id = Date.now();
    }
    address.id_user = this.user.id;
    address.name = this.user.name + " " + this.user.surname;

    const {data, error} = await this.supabaseClient
      .from('address')
      .insert([address])
      .single()

    if (error) {
      throw error;
    }

    this.moradas.push(address);
    this.notifyMoradasChange();

    return data;
  }

  async updateMorada(morada: Morada): Promise<void> {
    morada.id_user = this.user.id;
    morada.name = this.user.name + " " + this.user.surname;
    const index = this.moradas.findIndex(t => t.id === morada.id);
    if (index >= 0) {
      this.moradas[index] = morada
    }

    const {data, error} = await this.supabaseClient
      .from('address')
      .update({
        NIF: morada.NIF,
        address: morada.address,
        cod_postal: morada.cod_postal,
        city: morada.city,
        phone: morada.phone,
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

    await this.supabaseClient.from('address').delete().eq('id', id);

    this.notifyMoradasChange();
  }

  // Manage Data // 

  private notifyMoradasChange() {
    this.moradasSubject.next(this.moradas);
  }
}
