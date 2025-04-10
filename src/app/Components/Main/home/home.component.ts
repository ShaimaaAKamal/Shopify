import { Component, ViewChild } from '@angular/core';
import { CustomerService } from '../../../Services/Customer/customer.service';
import { ProductsService } from '../../../Services/Products/products.service';
import { OrderProductsService } from '../../../Services/OrderProduct/order-products.service';
import { BarcodeFormat } from '@zxing/library';
import { InputComponent } from '../../Shared/input/input.component';
import { OrderCalculationsService } from '../../../Services/OrderCalculations/order-calculations.service';
import { Product } from '../../../Interfaces/product';
import { Customer } from '../../../Interfaces/customer';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
@ViewChild('searchInputByName') searchInputByName!: InputComponent;
@ViewChild('searchInputByBarcode') searchInputByBarcode!: InputComponent;

customers!:Customer[];
selectedCustomer:Customer={name:'' , id:-1};
nameSearch:boolean=false;
barcodeSearch:boolean=false;
searchItems:Product[]=[];
  // formatsEnabled = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13];
  // selectedDevice: MediaDeviceInfo | undefined;

  // handleBarcodeResult(result: string) {
  //   console.log('Scanned barcode:', result);
  //   // You can process the result or search your database, etc.
  // }
//   onBarcodeScanned(barcode: string) {
//   console.log('Scanned barcode:', barcode);
//   // process barcode...
// }
constructor(private __CustomerService:CustomerService,private __ProductsService:ProductsService,
  private __OrderProductsService:OrderProductsService,private __OrderCalculationsService:OrderCalculationsService){}

ngOnInit(): void {
this.__CustomerService.customers.subscribe({
  next:customers => this.customers=customers
});
}
selectedCustomerEvent(customer:Customer){
  this.selectedCustomer=customer;
  this.__OrderCalculationsService.setInvoiveCustomer(customer);
}
searchProductsByName($event:any){
  const searchKey=$event.target.value;
  this.nameSearch=this.displaySearchIcon(searchKey);
 this.searchItems=this.__ProductsService.findProductByName(searchKey);
}

searchProductsByBarcode($event:any){
  const searchKey=$event.target.value;
    this.barcodeSearch=this.displaySearchIcon(searchKey);
  const filteredProducts:Product[]=this.__ProductsService.findProductByBarcode(searchKey);
  if(filteredProducts.length>0)
  {  this.addProductItem(filteredProducts[0]);
    this.barcodeSearch=false;
    this.searchInputByBarcode.value='';}
}
selectItem(product:any){
    this.addProductItem(product);
    this.searchInputByName.value = '';
    this.nameSearch=false;
    this.searchItems=[];
}
private displaySearchIcon(searchKey:string){
  return (searchKey == ' ' || !searchKey) ? false : true;
}

private addProductItem(proudct:any){
let products:Product[]=this.__OrderProductsService.products.value;
 let existingProductIndex:number = products.findIndex(p => p.barcode === proudct.barcode);

if (existingProductIndex > -1) {
  products[existingProductIndex].quantity += 1;
} else {
  proudct.quantity = 1;
  products.push(proudct);
}
    this.__OrderProductsService.products.next(products);
}
}
