import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/Main/home/home.component';
import { CustomersIndexComponent  as Customers} from './Components/Main/Customers/index/index.component';
import { DiscountsIndexComponent as Discounts } from './Components/Main/Discounts/index/index.component';
import { ReportsIndexComponent  as Reports} from './Components/Main/Reports/index/index.component';
import { SettingsIndexComponent as Settings} from './Components/Main/Settings/index/index.component';
import { EndDayComponent } from './Components/Main/end-day/end-day.component';
import { OrdersIndexComponent as Orders } from './Components/Main/Orders/index/index.component';
import { ProductsIndexComponent as Products} from './Components/Main/Products/index/index.component';
import { SalesPersonComponent } from './Components/Main/sales-person/sales-person.component';
import { ReturnOrderComponent } from './Components/Main/return-order/return-order.component';
import { CreateNewProductComponent } from './Components/Main/Products/create-new-product/create-new-product.component';

const routes: Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomeComponent},
  {path:'Shopping',redirectTo:'Home'},
  {path:'Products',component:Products},
  {path:'Add_New_Product',component:CreateNewProductComponent},
  {path:'Orders',component:Orders},
  {path:'Customers',component:Customers},
  {path:'Discounts',component:Discounts},
  {path:'Reports',component:Reports},
  {path:'Settings',component:Settings},
  {path:'End_Day',component:EndDayComponent},
  {path:'Return_Order',component:ReturnOrderComponent},
  {path:"SalesPerson",component:SalesPersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
