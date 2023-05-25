import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})

export class FilterComponent {
  @Input() filter: {
    price: {
      lower: number,
      upper: number,
    },
    brands: string[],
    RGB: boolean
  }; 

  constructor(private modalController: ModalController) { 
    this.filter = {price: { lower: 1, upper: 1000 }, brands: [], RGB: false };
  }

  ngOnInit() {}

  goBack() {
    return this.modalController.dismiss(false);
  }
  pinFormatter(value: number) {
    return `${value}€`;
  }

  rangeChange(ev: any) {
    this.filter.price = ev.detail.value;
  }
  
  clearFilters() {
    this.filter = {price: { lower: 1, upper: 1000 }, brands: [], RGB: false };
    this.applyFilters();
  }

  applyFilters() {
    return this.modalController.dismiss(this.filter);
  }

}
