import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  products=new BehaviorSubject<any[]>([
  { name: 'Iphone 14 pro max', price: 200, quantity: 2 , tax:5},
  { name: 'Samsung Galaxy S23', price: 180, quantity: 1 , tax:5},
  { name: 'Google Pixel 7', price: 250, quantity: 3 , tax:5},
    { name: 'Iphone 14 pro max', price: 200, quantity: 2 , tax:5},
  { name: 'Samsung Galaxy S23', price: 180, quantity: 1 , tax:5},
  { name: 'Google Pixel 7', price: 250, quantity: 3 , tax:5}
]);
  constructor() { }
}
