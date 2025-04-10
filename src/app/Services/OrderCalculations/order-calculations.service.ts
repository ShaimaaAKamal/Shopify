import { Injectable } from '@angular/core';
import { OrderProductsService } from '../OrderProduct/order-products.service';
import { BehaviorSubject } from 'rxjs';
import { SalesPerosnsService } from '../SalesPerosns/sales-perosns.service';
import { Product } from '../../Interfaces/product';
import { Customer } from '../../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class OrderCalculationsService {
  products!:Product[];
  discountvalue=new BehaviorSubject<number>(0);
  discount:number=0;
  invoiveCustomer:Customer={name:'',id:-1};
  constructor(private __OrderProductsService:OrderProductsService,private __SalesPerosnsService:SalesPerosnsService) {
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

getGrossTotal():number{
    if(this.products.length==0 ) return 0;
  return this.getNetTotal() + this.getTax()-this.discount
}
setInvoiveCustomer(customer:Customer){
this.invoiveCustomer=customer;
}
getSalesPerson(){
  return this.__SalesPerosnsService.currentSalesPerson.value;
}
}
