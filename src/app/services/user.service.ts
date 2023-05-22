import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  private supabaseClient: SupabaseClient;

  private user: User;
  isLoggedIn: boolean = false;
  userSubject: BehaviorSubject<User>;
  

  constructor(private storage: Storage,private supabaseservice: SupabaseService) { 
    this.supabaseClient = supabaseservice.getBD();
    this.user = {} as User;
    this.userSubject = new BehaviorSubject<User>(this.user);
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    const user = await storage.get('user');
    if (user) {
      this.user = user;
      this.isLoggedIn = true;
    }
    this.notifyUserChange();
  }

  async setLocal(user: User) {
    this.isLoggedIn = true;
    this.user = user;
    await this.storage.set('user', this.user);
    this.notifyUserChange();
  }

  async logout() {
    this.isLoggedIn = false;
    this.user = {} as User;
    await this.storage.set('user', this.user);
    this.notifyUserChange();
  }

  // CRUD //

  async login(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (user) {
      if (user.password === password) {
        this.setLocal(user);
      } else {
        throw new Error('Palavra-chave errada.');
      }
    } else {
      throw new Error('O email nao foi registado ainda.')
    }
  }

  async insertUser(user: User) {
    if (!user.id) {
      user.id = Date.now();
    }

    const flag = await this.isEmailExists(user.email);
    if (flag) {
      throw new Error('O email já se encontra registado no sistema.');
    }

    const {data, error} = await this.supabaseClient
      .from('users')
      .insert([user])
      .single();

    if (error) {
      throw new Error('Erro ao inserir utilizador.');
    }

    this.setLocal(user);

    return data;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const {data, error} = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error('O email nao foi registado ainda.');
    }

    return data as User | null;
  }

  async isEmailExists(email: string): Promise<boolean> {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('email')
      .eq('email', email);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data.length > 0;
  }

  async updateUser(user: User): Promise<void> {
    const {data, error} = await this.supabaseClient
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

    this.setLocal(user);
  }

  // Manage Data // 

  private notifyUserChange() {
    this.userSubject.next(this.user);
  }
}
