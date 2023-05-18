import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isRegisted: boolean;
  
  constructor(private router: Router) {
    const namePattern = /^[A-Za-z]+(\s+[A-Za-z]+)+$/;

    this.registerForm =  new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(namePattern)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
    this.isRegisted = false;
   }

  ngOnInit() {
  }
  
  goLogin() {
    this.router.navigate(['/login'])
  }

  goBack() {
    this.router.navigate([''])
  }

  registe() {
    this.isRegisted = true;
    if (!this.registerForm.valid) {
      return false;
    } else {
      console.log(this.registerForm.value);
      return true;
    }
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
