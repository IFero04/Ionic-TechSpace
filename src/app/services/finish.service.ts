import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order.module';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class FinishService {

  order: Order;
  orderSubject: BehaviorSubject<Order>;

  constructor(private cartService: CartService) { 
    this.order = {} as Order;
    this.order.idMorada = 1684870944874;
    this.order.local = 'Casa';
    this.order.opEntrega = 'Express';
    this.order.pagamento = 'MB Way';
    this.orderSubject = new BehaviorSubject<Order>(this.order);
  }

  clearOrder() {
    this.order = {} as Order;
    this.notifyCartChange();
  }
  
  addLocal(local: string) {
    if(local == 'Casa' || local == 'Loja') {
      this.order.local = local;
    }
    this.notifyCartChange();
  }

  addOpEntrega(opEntrega: string) {
    if(this.order.local == 'Casa') {
      if(opEntrega == 'Standard' || opEntrega == 'Premium' || opEntrega == 'Express'){
        this.order.opEntrega = opEntrega;
      }
    } else if (this.order.local == 'Loja') {
      if(opEntrega == 'Braga' || opEntrega == 'Porto' || opEntrega == 'Aveiro' || opEntrega == 'Amarante' || opEntrega == 'Lisboa'){
        this.order.opEntrega = opEntrega;
      } 
    }
    this.notifyCartChange();
  }

  addMorada(idMorada: number) {
    if (idMorada > 0) {
      this.order.idMorada = idMorada;
    }
    this.notifyCartChange();
  }

  addPagamento(pagamento: string) {
    if(pagamento == 'Cartão de Crédito' || pagamento == 'Referêrencia Multibanco' || pagamento == 'MB Way'){
      this.order.pagamento = pagamento;
    }
    this.notifyCartChange();
  }

  finishOrder() {
    this.clearOrder();
    this.cartService.finishOrder();
    this.notifyCartChange();
  }

  private notifyCartChange() {
    this.orderSubject.next(this.order);
  }
}
