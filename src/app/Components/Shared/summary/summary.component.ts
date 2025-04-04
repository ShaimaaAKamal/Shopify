import { Component, Input } from '@angular/core';
import { OrderProductsService } from '../../../Services/OrderProduct/order-products.service';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
products :any[]= [];

 private _discountValue: number = 0;

  get discount(): string {
    return this._discountValue + ' SAR';
  }

  set discount(value: string) {
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    this._discountValue = isNaN(numericValue) ? 0 : numericValue;
  }
constructor(private __OrderProductsService:OrderProductsService){}

ngOnInit(): void {
this.__OrderProductsService.products.subscribe({
  next:(products:any[]) => this.products=products
})
}

getTotalQuantity(): number {
  return this.products.reduce((total, product) => total + product.quantity, 0);
}
getNetTotal():number {
    return this.products.reduce((total, product) => total + (product.quantity * product.price), 0);
}
getTax():number{
      return this.products.reduce((total, product) => total + (product.quantity * product.tax), 0);
}
getGrossTotal(){
return this.getNetTotal() + this.getTax()-this._discountValue;
}
}
