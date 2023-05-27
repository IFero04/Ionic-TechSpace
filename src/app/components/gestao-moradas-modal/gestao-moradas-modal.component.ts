import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Morada } from 'src/app/models/morada.module';
import { MoradasService } from 'src/app/services/moradas.service';


@Component({
  selector: 'app-gestao-moradas-modal',
  templateUrl: './gestao-moradas-modal.component.html',
  styleUrls: ['./gestao-moradas-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})

export class GestaoMoradasModalComponent {
  @Input() title: string;
  @Input() button: string;
  @Input() morada: Morada | null;

  clicked: boolean = false;
  errorMessage: string = '';  
  moradaForm: FormGroup;

  constructor(private modalController: ModalController, private moradaService: MoradasService) {
    this.title = '';
    this.button = '';
    this.morada = null;

    this.moradaForm = new FormGroup({
      NIF: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      address: new FormControl('', [Validators.required]),
      cod_postal: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}-\d{3}$/)]),
      city: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^9\d{8}$/)])
    });
  }

  async onClick() {
    this.clicked = true;
    this.errorMessage = '';
    if (this.moradaForm.invalid) {
      return false;
    }
    try {
      const NIF = this.moradaForm.controls['NIF'].value;
      const address = this.moradaForm.controls['address'].value;
      const cod_postal = this.moradaForm.controls['cod_postal'].value;
      const city = this.moradaForm.controls['city'].value;
      const phone = this.moradaForm.controls['phone'].value;

      if (this.morada && this.morada.id) {
        const morada: Morada = { id: this.morada.id, NIF: NIF, address: address, cod_postal: cod_postal, city: city, phone: phone};
        await this.moradaService.updateMorada(morada);
      } else {
        const morada: Morada = { NIF: NIF, address: address, cod_postal: cod_postal, city: city, phone: phone};
        await this.moradaService.insertMorada(morada);
      }

      return this.modalController.dismiss(true);
    } catch(error: any) {
      this.errorMessage = error.toString();
    }
    return true;
  }

  get formControls() {
    return this.moradaForm.controls;
  }

  goBack() {
    return this.modalController.dismiss(false);
  }

}
