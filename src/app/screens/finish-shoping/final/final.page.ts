import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FinishService } from 'src/app/services/finish.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.page.html',
  styleUrls: ['./final.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class FinalPage implements OnInit, OnDestroy {

  constructor(private router: Router, private orderService: FinishService) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['']);
    }, 3000);
  }

  ngOnDestroy(): void {
    this.orderService.finishOrder();
  }

}
