import { Component } from '@angular/core';
import { ProductsService } from '../../../../Services/Products/products.service';

@Component({
  selector: 'app-products-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class ProductsIndexComponent  {
  products!: any[];
  columns: any[] = [];
  constructor(
    private __ProductsService: ProductsService) {
    this.__ProductsService.products.subscribe({
      next: (products) => (this.products = products),
    });
  }

 ngOnInit() {

   this.columns = [
    {
    name: '',
    prop: '$$checkbox',
    width: 50,
    sortable: false,
    canAutoResize: false,
    draggable: false,
    resizeable: false,
    checkboxable: true,
    headerCheckboxable: true,
    cellTemplate: null,
    isCheckboxColumn: true
  },
      { name: 'Name', prop: 'name',mobileVisible: true, tabletVisible: true },
      { name: 'Price', prop: 'price' ,  mobileVisible: false, tabletVisible: true},
      { name: 'Quantity', prop: 'quantity',  mobileVisible: false, tabletVisible: false },
      { name: 'Tax', prop: 'tax',   mobileVisible: false, tabletVisible: false },
      { name: 'Status', prop: 'status',
      cellClass: ({ row }: any) => {
    return row.status === 'Active' ? 'status-active' : 'status-inactive';
  }
  },
      { name: 'Barcode', prop: 'barcode', mobileVisible: false, tabletVisible: false},
    ];
}

}
