import { Component } from '@angular/core';
import { OrderCalculationsService } from '../../../../Services/OrderCalculations/order-calculations.service';

@Component({
  selector: 'app-home-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})

export class PaymentComponent {

activeInput: string = '';
keypad: string[][] = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['.', '0', 'C']
];

paymentMethods: {
    label: string;
    name: string;
    id: string;
    focusKey: string;
  }[] = [];

private _discountValue: number = 0;
  private _Cash: number = 0;
  private _Master_Card: number = 0;
  private _Network: number = 0;

  constructor(private __OrderCalculationsService:OrderCalculationsService){}

  ngOnInit(): void {
         this.paymentMethods = [
      {
        label: 'Discount',
        name: 'discount',
        id: 'discount',
        focusKey: '_discountValue'
      },
      {
        label: 'Cash',
        name: 'Cash',
        id: 'Cash',
        focusKey: '_Cash'
      },
      {
        label: 'Master Card',
        name: 'Master_Card',
        id: 'Master_Card',
        focusKey: '_Master_Card'
      },
      {
        label: 'Network',
        name: 'Network',
        id: 'Network',
        focusKey: '_Network'
      }
    ];
  }

    getModelValue(focusKey: string): string {
    return this.formatCurrency((this as any)[focusKey] || 0);
  }

  setModelValue(focusKey: string, value: string) {
    const numeric = this.parseCurrency(value);
    (this as any)[focusKey] = numeric;

    if (focusKey === '_discountValue') {
      this.__OrderCalculationsService.discountvalue.next(numeric);
    }
  }

  private formatCurrency(value: number): string {
    return `${value} SAR`;
  }

  private parseCurrency(value: string): number {
    const numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue;
  }

  getPaidAmount():number{
    return Number(this._Cash) + Number(this._Master_Card) + Number(this._Network);
  }

  calculateReminder():number{
    const reminder= this.getPaidAmount()-this.__OrderCalculationsService.getGrossTotal();
    return reminder < 0 ? 0 : reminder;
  }

   setActiveInput(activePaymentMethod: string) {
    this.activeInput = activePaymentMethod;
  }

  enterKey(key: string) {
  if (!this.activeInput) return;

  let currentValue = (this as any)[this.activeInput] as string;
  let newValue = currentValue;

  if (key === 'C') {
    newValue = '0';
  } else if (key === '.') {
    if (!currentValue.includes('.')) {
      newValue += '.';
    }
  } else {
    newValue = currentValue === '0' ? key : currentValue + key;
    newValue = newValue.replace(/^0+(?!\.)/, '');
  }
  if (this.activeInput === '_discountValue') {
    this.__OrderCalculationsService.discountvalue.next(Number(newValue));
  }

  (this as any)[this.activeInput] =(newValue);
}
}
