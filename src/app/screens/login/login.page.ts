import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLogedIn: boolean;

  constructor(private router: Router) { 
    this.loginForm =  new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
    this.isLogedIn = false;
  }

  ngOnInit() {
  }

  goBack() {
    this.router.navigate([''])
  }

  login() {
    this.isLogedIn = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      console.log(this.loginForm.value);
      return true;
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }
}
