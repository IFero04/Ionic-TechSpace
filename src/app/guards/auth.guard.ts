import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: UserService, private router: Router) {  }

  canActivate(): boolean {
    //!this.auth.isLoggedIn
    if (false) {
      this.router.navigate(['/register']);
      return false;
    }
    return true
  }
}
