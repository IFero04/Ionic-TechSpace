import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-gestao-dados-modal',
  templateUrl: './gestao-dados-modal.component.html',
  styleUrls: ['./gestao-dados-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})

export class GestaoDadosModalComponent{
  isUpdated: boolean = false;
  errorMessage: string = '';  
  updateForm: FormGroup;

  isLoadingUser: boolean;
  user: User;
  userSubscription: Subscription;

  constructor(private modalController: ModalController, private userService: UserService) {
    const pattern = /^[A-Za-z]+$/;
    
    this.updateForm =  new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      surname: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });

    this.user = {} as User;
    this.isLoadingUser = true; 
    this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
      this.user = user;
    });
    this.isLoadingUser = false; 
  }

  async update() {
    this.isUpdated = true;
    this.errorMessage = '';
    if (this.updateForm.invalid) {
      return false;
    }
    try {
      const name = this.updateForm.controls['name'].value;
      const surname = this.updateForm.controls['surname'].value;
      const email = this.updateForm.controls['email'].value.toLowerCase();
      const password = this.updateForm.controls['password'].value;

      const user: User = { id: this.user.id, name: name, surname: surname, email: email, password: password };
      await this.userService.updateUser(user);
      return this.modalController.dismiss(true);
    } catch(error: any) {
      this.errorMessage = error.toString();
    }
    return true;
  }

  get formControls() {
    return this.updateForm.controls;
  }

  goBack() {
    return this.modalController.dismiss(false);
  }

}
