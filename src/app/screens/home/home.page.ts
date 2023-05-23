import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { GestaoMoradasModalComponent } from 'src/app/components/gestao-moradas-modal/gestao-moradas-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule, SearchbarComponent],
})
export class HomePage implements OnInit{
  categories: Category[] = [];

  constructor(private router: Router, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.getCategories();
  }

  click() {
    this.router.navigate(['/morada'])
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
