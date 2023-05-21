import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { GestaoDadosModalComponent } from 'src/app/components/gestao-dados-modal/gestao-dados-modal.component';
import { ConfirmModalComponent } from 'src/app/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class ProfilePage  implements  OnInit{

  user: User = {} as User;

  constructor(private router: Router, private userService: UserService, private modalCtrl: ModalController) {
  }

  async ngOnInit() {
    this.user = this.userService.getUser();
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['/tabs/home']);
  }

  async clickDadosPessoais() {
    const modal = await this.modalCtrl.create({
      component: GestaoDadosModalComponent,
    });

    await modal.present();
  }

  clickMoradas() {
    this.router.navigate(['/morada'])
  }

}
