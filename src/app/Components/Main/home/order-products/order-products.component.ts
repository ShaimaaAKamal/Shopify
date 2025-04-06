import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { OrderProductsService } from '../../../../Services/OrderProduct/order-products.service';
import { OrderCalculationsService } from '../../../../Services/OrderCalculations/order-calculations.service';

@Component({
  selector: 'app-order-products',
  standalone: false,
  templateUrl: './order-products.component.html',
  styleUrl: './order-products.component.scss'
})
export class OrderProductsComponent {
 products :any[]= [];

 constructor(private __OrderProductsService:OrderProductsService,private __OrderCalculationsService:OrderCalculationsService){}

 ngOnInit(): void {
 this.__OrderProductsService.products.subscribe({
   next:(products:any[]) => this.products=products
 })
}


updateQuantity(index:number, newQuantity:number){
      this.products[index].quantity = newQuantity;
      this.__OrderProductsService.products.next(this.products);
}
removeProduct(index:number){
      this.products.splice(index, 1);
      this.__OrderProductsService.products.next(this.products);
}
getTotalQuantity():number{
  return this.__OrderCalculationsService.getTotalQuantity();
}
}
