import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SalesPerson } from '../../Interfaces/sales-person';

@Injectable({
  providedIn: 'root'
})
export class SalesPerosnsService {
  salesPersons=new BehaviorSubject<SalesPerson[]>([]);
  currentSalesPerson=new BehaviorSubject<SalesPerson>({name:'',id:-1});
  constructor() { }

  SetCurrentSalesPerson(salesPerson:SalesPerson){
    this.currentSalesPerson.next(salesPerson);
  }
}
