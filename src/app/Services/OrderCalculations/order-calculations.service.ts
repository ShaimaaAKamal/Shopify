import { Injectable } from '@angular/core';
import { OrderProductsService } from '../OrderProduct/order-products.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderCalculationsService {
  products!:any[]
  discountvalue=new BehaviorSubject<number>(0);
  discount:number=0;
  constructor(private __OrderProductsService:OrderProductsService) {
    this.__OrderProductsService.products.subscribe({
      next : products => this.products=products
    });
   this.discountvalue.subscribe({
      next: (discount:number) =>{
        this.discount=discount;
      }
     })
  }

getTotalQuantity(): number {
  if(this.products.length==0 ) return 0;
  console.log(this.products);
  return this.products.reduce((total, product) => total + product.quantity, 0);
}
getNetTotal():number {
    if(this.products.length==0 ) return 0;
    return this.products.reduce((total, product) => total + (product.quantity * product.price), 0);
}
getTax():number{
    if(this.products.length==0 ) return 0;
      return this.products.reduce((total, product) => total + (product.quantity * product.tax), 0);
}

getGrossTotal(){
    if(this.products.length==0 ) return 0;
  return this.getNetTotal() + this.getTax()-this.discount
}
}
