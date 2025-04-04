import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers=new BehaviorSubject<any[]>([
    "Mohamed Ahmed",
    "Ali Muhamed",
    "Omar Ali"
  ]);
  constructor() { }
}
