import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';


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

  constructor(private cartService: CartService, private route: ActivatedRoute, private router: Router) {
    this.products = [];
    this.filteredProducts = [];
    this.searchTerm= '';
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params['searchTerm'] || '';
      this.loadProducts().then((products) => {
        this.products = products;
        if (this.searchTerm.trim() === '') {
          this.filteredProducts = [...this.products];
        } else {
          this.filterProducts();
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

  private filterProducts() {
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

  search() {
    if (this.searchTerm === '') {
      this.router.navigate(['/tabs/home'])
    } else {
      this.filterProducts();
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
