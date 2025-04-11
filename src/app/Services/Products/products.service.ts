import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 products=new BehaviorSubject<Product[]>([]);
 usedProducts!:Product[]
  constructor() {
    this.products.subscribe({
      next:prod=>this.usedProducts=prod
    });

    this.products.next([
      { name: 'Iphone 14 pro max', price: 200, quantity: 1 , tax:5,barcode:'1234567890123',status:'Active'},
  { name: 'Samsung Galaxy S23', price: 180, quantity: 1 , tax:5,barcode:'1234567890323',status:'Active'},
  { name: 'Google Pixel 7', price: 250, quantity: 1 , tax:5,barcode:'1234567820123',status:'Inactive'},
    { name: 'Iphone 15 pro max', price: 200, quantity: 1 , tax:5,barcode:'1232567890123',status:'Inactive'},
  { name: 'Samsung Galaxy S24', price: 180, quantity: 1 , tax:5,barcode:'1233567890123',status:'Inactive'},
  { name: 'Google Pixel 8', price: 250, quantity: 1 , tax:5,barcode:'1534567890123',status:'Inactive'},
  ])
}

  findProductByName(name:string):Product[]{
     const search = name.trim().toLowerCase();
   return  this.usedProducts.filter(product =>
     product.name.toLowerCase().includes(search)
  );
  }

  findProductByBarcode(barcode:string):Product[]{
    const search = barcode.trim().toLowerCase();
    return this.usedProducts.filter(product =>
      product.barcode.toLowerCase() == search
   );
  }
}
