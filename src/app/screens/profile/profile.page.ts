import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent]
})
export class ProfilePage  implements  OnInit{

  user: User = {} as User;

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.loadUser();
  }

  async loadUser() {
    try {
      this.user = await this.userService.getUser();
    } catch (error) {
      console.error(error);
    }
  }

}
