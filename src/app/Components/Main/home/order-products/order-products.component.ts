import { Component, Input, Output } from '@angular/core';
import { OrderProductsService } from '../../../../Services/OrderProduct/order-products.service';

@Component({
  selector: 'app-order-products',
  standalone: false,
  templateUrl: './order-products.component.html',
  styleUrl: './order-products.component.scss'
})
export class OrderProductsComponent {
 products :any[]= [];
 constructor(private __OrderProductsService:OrderProductsService){}

 ngOnInit(): void {
 this.__OrderProductsService.products.subscribe({
   next:(products:any[]) => this.products=products
 })
}

updateQuantity(index:number, newQuantity:number){
      this.products[index].quantity = newQuantity;
      this.__OrderProductsService.products.next(this.products);
}
}
