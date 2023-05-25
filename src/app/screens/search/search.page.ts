import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { FilterComponent } from 'src/app/components/filter/filter.component';


@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent, NgFor, FormsModule]
})
export class SearchPage implements OnInit{
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  filter: {
    price: {
      lower: number,
      upper: number,
    },
    brands: string[],
    RGB: boolean | undefined
  };

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router, private modalCtrl: ModalController) {
    this.products = [];
    this.filteredProducts = [];
    this.searchTerm= '';
    this.filter = {price: { lower: 1, upper: 1000 }, brands: [], RGB: undefined };
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
      this.loadProducts().then((products) => {
        this.products = products;
        if (this.searchTerm.trim() === '') {
          this.filteredProducts = [...this.products];
        } else {
          this.search();
        }
      });
    });
  }

  private loadProducts(): Promise<Product[]> {
    return fetch('./assets/json/products.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load products.');
        }
        return response.json();
      })
      .then((json) => json as Product[]);
  }

  search() {
    const searchTerms = this.searchTerm.toLowerCase().trim().split(' ');
    this.filteredProducts = this.products.filter((product) => {
      const marca = product.Marca.toLowerCase().trim();
      const modelo = product.Modelo.toLowerCase().trim();
      const descricao = product.Descricao.toLowerCase().trim();
      const categoria = product.Categoria.toLowerCase().trim();
      return searchTerms.every((term) => {
        return (
          marca.includes(term) ||
          modelo.includes(term) ||
          descricao.includes(term) ||
          categoria.includes(term)
        );
      });
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.search();
  }

  async filterProducts() {
    const modal = await this.modalCtrl.create({
      component: FilterComponent,
      componentProps: {
        filter: this.filter,
      },
    });
  
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      this.filter = data;

      if (this.searchTerm === '') {
        console.log(this.filteredProducts);
        this.filterByPriceRange(this.products);
        console.log(this.filteredProducts);
        this.filterByBrand(this.filteredProducts);
        console.log(this.filteredProducts);
        this.filterByRGB(this.filteredProducts);
        console.log(this.filteredProducts);
      }
      else {
        this.filterByPriceRange(this.filteredProducts);
        this.filterByBrand(this.filteredProducts);
        this.filterByRGB(this.filteredProducts);
      }
    }
  }

  filterByPriceRange(toFilter: Product[]) {
    this.filteredProducts = toFilter.filter((product) => {
      return product.Preco >= this.filter.price.lower && product.Preco <= this.filter.price.upper;
    });
  }

  filterByBrand(toFilter: Product[]) {
    if (this.filter.brands.length > 0) {
      this.filteredProducts = toFilter.filter((product) => {
        return this.filter.brands.includes(product.Marca);
      });
    }
  }

  filterByRGB(toFilter: Product[]) {
    console.log(this.filter.RGB);
    if (this.filter.RGB || !this.filter.RGB) {
      console.log('Entrei');
      this.filteredProducts = toFilter.filter((product) => {
        return product.RGB === this.filter.RGB;
      });
    } 
  }

  clickCart(product: Product) {
    product.cart = true;
    this.cartService.insertCart(product);
  }

  clickFav(product: Product) {
    product.fav = true;
    this.cartService.insertFav(product);
  }

}
