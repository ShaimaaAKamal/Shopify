import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  products=new BehaviorSubject<any[]>([]);
  constructor() { }

}
