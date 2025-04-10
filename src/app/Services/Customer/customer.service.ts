import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../Interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers=new BehaviorSubject<Customer[]>([
    {name:"Mohamed Ahmed",id:1},
   { name:"Ali Muhamed",id:2},
    {name:"Omar Ali",id:3}
  ]);
  constructor() { }
}
