import { Component } from '@angular/core';
import { IonicModule, ModalController, ViewWillEnter } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ScreenOrientation, OrientationLockOptions } from '@capacitor/screen-orientation';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, FormsModule],
})
export class HomePage implements ViewWillEnter{
  searchTerm;

  constructor(private router: Router, private userService: UserService) { 
    this.searchTerm = '';
  }

  ionViewWillEnter(): void {
    const options: OrientationLockOptions = { orientation: 'portrait' };
    ScreenOrientation.lock(options);
  }

  search() {
    if (this.searchTerm.trim() !== ''){
      const send = this.searchTerm
      this.searchTerm = '';
      this.router.navigate(['/tabs/search'], {queryParams: {searchTerm: send}})
    }
  }

  goTo(page: string) {
    if (this.userService.isLoggedIn) {
      this.router.navigate([page]);
    } else {
      this.router.navigate(['/register']);
    }
  }
}
