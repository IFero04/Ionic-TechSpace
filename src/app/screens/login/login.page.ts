import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MoradasService } from 'src/app/services/moradas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLogedIn: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService, private moradaService: MoradasService) { 
    this.loginForm =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit() {
  }

  async login() {
    this.isLogedIn = true;
    this.errorMessage = '';
    if (this.loginForm.invalid) {
      return false;
    }
    try {
      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;

      await this.userService.login(email, password);
      await this.moradaService.init();
      this.router.navigateByUrl('/tabs/home');
      return true;
    } catch(error: any) {
      this.errorMessage = error.toString();
    } 
    return true;
  }

  recuperarSenha() {
    console.log('Nabo')
  }

  get formControls() {
    return this.loginForm.controls;
  }

  goRegister() {
    this.router.navigate(['/register'])
  }

  goBack() {
    this.router.navigate([''])
  }
}
