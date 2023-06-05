import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MoradasService } from 'src/app/services/moradas.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})

export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  isRegisted: boolean = false;
  errorMessage: string = '';
  
  constructor(private router: Router, private userService: UserService, private moradaService: MoradasService) {
    const namePattern = /^[A-Za-z]+\s+[A-Za-z]+$/;

    this.registerForm =  new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(namePattern)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
   }

  ngOnInit() {
  }
  
  goLogin() {
    this.router.navigate(['/login'])
  }

  goBack() {
    this.router.navigate([''])
  }

  async registe() {
    this.isRegisted = true;
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      return false;
    }
    try {
      const fullName = this.registerForm.controls['name'].value;
      const email = this.registerForm.controls['email'].value.toLowerCase();
      const password = this.registerForm.controls['password'].value;

      const nameParts = fullName.split(' ');
      const name = nameParts[0];
      const surname = nameParts.slice(1).join(' ');

      
      const user: User = { name: name, surname: surname, email: email, password: password };
      await this.userService.insertUser(user);
      await this.moradaService.init();
      this.router.navigateByUrl('/tabs/home');
      return true;
    } catch (error: any) {
      this.errorMessage = error.toString();
    }
    return true;
  }

  get formControls() {
    return this.registerForm.controls;
  }
}
