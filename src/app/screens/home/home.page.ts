import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { GestaoMoradasModalComponent } from 'src/app/components/gestao-moradas-modal/gestao-moradas-modal.component';
import { time } from 'console';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule],
})
export class HomePage {
  searchTerm;

  constructor(private router: Router, private modalCtrl: ModalController) { 
    this.searchTerm = '';
  }

  search() {
    if (this.searchTerm.trim() !== ''){
      const send = this.searchTerm
      this.searchTerm = '';
      this.router.navigate(['/tabs/search'], {queryParams: {searchTerm: send}})
    }
  }

}
