import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';

import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, SearchbarComponent],
})
export class HomePage {
  categories: Category[] = [];

  constructor() {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categories = [
      {
        id: 1,
        label: 'As minhas compras',
        icon: 'cart',
        active: true,
      },
      {
        id: 2,
        label: 'Favoritos',
        icon: 'heart',
        active: false,
      },
      {
        id: 3,
        label: 'Mensagens',
        icon: 'chatbubbles',
        active: false,
      },
      {
        id: 4,
        label: 'Cupöes',
        icon: 'cup',
        active: false,
      },
    ];
  }

}
