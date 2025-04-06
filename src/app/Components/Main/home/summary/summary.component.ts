import { Component, EventEmitter, Output } from '@angular/core';
import { OrderProductsService } from '../../../../Services/OrderProduct/order-products.service';
import { OrderCalculationsService } from '../../../../Services/OrderCalculations/order-calculations.service';

@Component({
  selector: 'app-summary',
  standalone: false,
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

constructor(private __OrderCalculationsService:OrderCalculationsService){}

getNetTotal():number {
    return this.__OrderCalculationsService.getNetTotal();
}
getTax():number{
      return this.__OrderCalculationsService.getTax();
}
getGrossTotal(){
  return this.__OrderCalculationsService.getGrossTotal();
}
}
