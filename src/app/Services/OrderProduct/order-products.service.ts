import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  products=new BehaviorSubject<Product[]>([]);
  constructor() { }

}
