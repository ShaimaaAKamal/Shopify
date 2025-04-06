import { Component } from '@angular/core';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { ProductsService } from '../../../Services/Products/products.service';
import { OrderProductsService } from '../../../Services/OrderProduct/order-products.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
customers!:any[];
selectedCustomer:string='';

constructor(private __CustomerService:CustomerService,private __ProductsService:ProductsService,private __OrderProductsService:OrderProductsService){}
ngOnInit(): void {
this.__CustomerService.customers.subscribe({
  next:customers => this.customers=customers
})
}
selectedCustomerEvent(customer:string){
  this.selectedCustomer=customer;
}
searchProductsByName($event:any){
  const searchKey=$event.target.value;
  const filteredProducts=this.__ProductsService.findProductByName(searchKey);
}

searchProductsByBarcode($event:any){
  const searchKey=$event.target.value;
  const filteredProducts=this.__ProductsService.findProductByBarcode(searchKey);
  if(filteredProducts.length>0){
    let products=this.__OrderProductsService.products.value;
 let existingProductIndex = products.findIndex(p => p.barcode === filteredProducts[0].barcode);

if (existingProductIndex > -1) {
  products[existingProductIndex].quantity += 1;
} else {
  filteredProducts[0].quantity = 1;
  products.push(filteredProducts[0]);
}
    this.__OrderProductsService.products.next(products);
}}
}
