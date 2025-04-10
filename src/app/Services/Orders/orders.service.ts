import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  orders=new BehaviorSubject<any[]>([]);
  constructor() { }
  addNewOrder(order:any):boolean{
    console.log(order);
    return true;
  }
}
