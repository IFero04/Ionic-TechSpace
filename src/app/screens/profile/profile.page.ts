import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertController, IonicModule, ModalController } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { GestaoDadosModalComponent } from 'src/app/components/gestao-dados-modal/gestao-dados-modal.component';
import { Subscription } from 'rxjs';
import { MoradasService } from 'src/app/services/moradas.service';


@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ExploreContainerComponent]
})
export class ProfilePage implements OnDestroy{
  isLoadingUser: boolean;
  user: User;
  userSubscription: Subscription;

  constructor(private router: Router, private userService: UserService, private modalCtrl: ModalController, private alertController: AlertController, private moradaService: MoradasService) {
    this.user = {} as User;
    this.isLoadingUser = true;
    this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
      this.user = user;
      this.isLoadingUser = false;
    });
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Sair da Conta?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
        }
      ]
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss(); 
  
    if (role === 'confirm') {
      await this.userService.logout();
      await this.moradaService.logout();
      this.router.navigate(['/tabs/home']);
    }
  }
  

  async clickDadosPessoais() {
    const modal = await this.modalCtrl.create({
      component: GestaoDadosModalComponent,
    });

    await modal.present();
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
