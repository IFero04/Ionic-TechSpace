import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CartService {
  private cart: Product[];
  cartSubject: BehaviorSubject<Product[]>;
  total: number;
  totalSubject: BehaviorSubject<number>;


  constructor(private storage: Storage) { 
    this.cart = [];
    this.total = 0;
    this.cartSubject = new BehaviorSubject<Product[]>(this.cart);
    this.totalSubject = new BehaviorSubject<number>(this.total);
    this.init();
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    const storage = await this.storage.create();
    const cart = await storage.get('cart');
    if (cart) {
      this.cart = cart;
    }

    this.calculateTotal();
    this.notifyCartChange();
  }

  calculateTotal() {
    let totalPrice = 0;
    for (const product of this.cart) {
      if (product.cart) {
        totalPrice += product.Preco;
      }
    }
    this.total = totalPrice;
  }

  async insertProduct(product: Product) {
    if (!product.id) {
      product.id = Date.now();
    }
    
    this.cart.push(product);
    await this.storage.set('cart', this.cart);
    
    this.notifyCartChange();
  }

  async insertCart(product: Product) {
    const existingProduct = this.cart.find((p) => p.id === product.id && p.cart === product.cart);
    if(existingProduct) {
      if(existingProduct.fav) {
        product.fav = true;
        await this.updateProduct(product);
        console.log('CartUpdate');
      }
      console.log('CartSair');
      return;
    }
    console.log('CartInserir');
    await this.insertProduct(product);
  }

  async insertFav(product: Product) {
    const existingProduct = this.cart.find((p) => p.id === product.id && p.fav === product.fav);
    if(existingProduct) {
      if(existingProduct.cart) {
        product.cart = true;
        await this.updateProduct(product);
        console.log('FavUpdate');
      }
      console.log('FavSair');
      return;
    }

    console.log('FavInserir');
    await this.insertProduct(product);;
  }

  async removeProduct(id: number) {
    const index = this.cart.findIndex((p) => p.id === id);
    if (index >= 0) {
      this.cart.splice(index, 1);
      await this.storage.set('cart', this.cart);
    }
    this.notifyCartChange();
  }

  async removeCart(id: number) {
    const index = this.cart.findIndex((p) => p.id === id);
    if (index >= 0) {
      if (this.cart[index].fav) {
        this.cart[index].cart = false;
        await this.storage.set('cart', this.cart);
      } else {
        await this.removeProduct(id);
      }
    }
    this.notifyCartChange();
  }

  async removeFav(id: number) {
    const index = this.cart.findIndex((p) => p.id === id);
    if (index >= 0) {
      if (this.cart[index].cart) {
        this.cart[index].fav = false;
        await this.storage.set('cart', this.cart);
      } else {
        await this.removeProduct(id);
      }
    }
    this.notifyCartChange();
  }

  async updateProduct(product: Product) {
    const index = this.cart.findIndex((p) => p.id === product.id);
    if (index >= 0) {
      this.cart[index] = product;
      await this.storage.set('cart', this.cart);
    }
    this.notifyCartChange();
  }

  getProductsFav() {
    return this.cart.filter((p) => p.fav);
  }  

  getProductsCart() {
    return this.cart.filter((p) => p.cart);
  }

  // Manage Data //

  private notifyCartChange() {
    this.cartSubject.next(this.cart);
    this.calculateTotal();
    this.totalSubject.next(this.total);
  }
}
