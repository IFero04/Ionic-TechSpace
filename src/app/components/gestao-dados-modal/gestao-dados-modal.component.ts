import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestao-dados-modal',
  templateUrl: './gestao-dados-modal.component.html',
  styleUrls: ['./gestao-dados-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})

export class GestaoDadosModalComponent implements OnInit{

  updateForm: FormGroup;
  isUpdated: boolean = false;
  errorMessage: string = '';  
  user: User = {} as User;

  constructor(private modalController: ModalController, private userService: UserService) {
    const pattern = /^[A-Za-z]+$/;
    
    this.updateForm =  new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      surname: new FormControl('', [Validators.required, Validators.pattern(pattern)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(2)])
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
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
