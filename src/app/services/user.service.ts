import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private supabaseCliente: SupabaseClient;
  private user: User;
  isLoggedIn: boolean = false;

  constructor(private storage: Storage,private supabaseservice: SupabaseService) { 
    this.supabaseCliente = supabaseservice.getBD();
    this.user = {} as User;
    this.init();
  }

  async setlocal(user: User) {
    this.isLoggedIn = true;
    this.user = user;
    await this.storage.set('user', this.user);
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    const user = await storage.get('user');
    if (user.id > 0) {
      this.user = user;
      this.isLoggedIn = true;
    }
  }

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (user) {
      if (user.password === password) {
        this.setlocal(user);
      } else {
        throw new Error('Palavra-chave errada.');
      }
    } else {
      throw new Error('O email nao foi registado ainda.')
    }
  }

  async logout() {
    this.user = {} as User;
    this.isLoggedIn = false;
    await this.storage.set('user', this.user);
  }

  async insertUser(user: User) {
    if (!user.id) {
      user.id = Date.now();
    }

    const flag = await this.isEmailExists(user.email);
    if (flag) {
      throw new Error('O email já se encontra registado no sistema.');
    }

    const {data, error} = await this.supabaseCliente
      .from('users')
      .insert([user])
      .single();

    if (error) {
      throw Error;
    }

    this.setlocal(user);

    return data;
  }

  async getUserByEmail(email: string): Promise<User> {
    const {data, error} = await this.supabaseCliente
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as User;
  }

  async isEmailExists(email: string): Promise<boolean> {
    const { data, error } = await this.supabaseCliente
      .from('users')
      .select('email')
      .eq('email', email);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data.length > 0;
  }

  async updateUser(user: User): Promise<void> {
    const {data, error} = await this.supabaseCliente
      .from('users')
      .update({
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: user.password,
      })
      .eq('id', user.id);

    if (error) {
      throw new Error('Erro ao atualizar utilizador');
    }

    this.setlocal(user);
  }

  getUser(): User{
    return this.user;
  }
}
