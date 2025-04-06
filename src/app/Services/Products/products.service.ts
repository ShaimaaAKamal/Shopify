import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products!:any[]
  constructor() {
    this.products=[
  { name: 'Iphone 14 pro max', price: 200, quantity: 1 , tax:5,barcode:'1234567890123'},
  { name: 'Samsung Galaxy S23', price: 180, quantity: 1 , tax:5,barcode:'1234567890323'},
  { name: 'Google Pixel 7', price: 250, quantity: 1 , tax:5,barcode:'1234567820123'},
    { name: 'Iphone 15 pro max', price: 200, quantity: 1 , tax:5,barcode:'1232567890123'},
  { name: 'Samsung Galaxy S24', price: 180, quantity: 1 , tax:5,barcode:'1233567890123'},
  { name: 'Google Pixel 8', price: 250, quantity: 1 , tax:5,barcode:'1534567890123'},
   { name: 'Samsung Galaxy S25', price: 180, quantity: 1 , tax:5,barcode:'7234567890123'},
  { name: 'Google Pixel 23', price: 250, quantity: 1 , tax:5,barcode:'9234567890123'}
];
   }

  findProductByName(name:string){
     const search = name.trim().toLowerCase();
   return  this.products.filter(product =>
     product.name.toLowerCase().includes(search)
  );
  }

  findProductByBarcode(barcode:string){
    const search = barcode.trim().toLowerCase();
    return this.products.filter(product =>
      product.barcode.toLowerCase() == search
   );
  }
}
