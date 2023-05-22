import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-morada',
  templateUrl: './morada.page.html',
  styleUrls: ['./morada.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class MoradaPage {
  isLoadingMoradas: boolean;
  moradas: Morada[];
  moradasSubscription: Subscription = new Subscription();

  constructor(private router: Router, private moradaservice: MoradasService) {
    this.moradas = [];
    this.isLoadingMoradas = true;
    this.subscribeToMoradas();
  }

  subscribeToMoradas() {
    this.isLoadingMoradas = true; 
    this.moradasSubscription = this.moradaservice.moradasSubject.subscribe((moradas: Morada[]) => {
      this.moradas = moradas;
    });
    this.isLoadingMoradas = false; 
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }

  clickManageMoradas() {
    console.log(this.moradas);
  }

  ngOnDestroy() {
    this.moradasSubscription.unsubscribe();
  }
}
