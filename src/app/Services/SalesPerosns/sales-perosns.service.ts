import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesPerosnsService {
  salesPersons=new BehaviorSubject<any[]>([]);
  currentSalesPerson=new BehaviorSubject<{}>({});
  constructor() { }
  
  SetCurrentSalesPerson(salesPerson:{}){
    this.currentSalesPerson.next(salesPerson);
  }
}
