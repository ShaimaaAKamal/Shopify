import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/Main/home/home.component';
import { SideNavComponent } from './Components/Shared/side-nav/side-nav.component';
import { ActionBtnComponent } from './Components/Shared/action-btn/action-btn.component';
import { InputComponent } from './Components/Shared/input/input.component';
import { NavItemComponent } from './Components/Shared/nav-item/nav-item.component';
import { NavSalesPersonComponent } from './Components/Shared/nav-sales-person/nav-sales-person.component';
import { CustomersIndexComponent } from './Components/Main/Customers/index/index.component';
import { EndDayComponent } from './Components/Main/end-day/end-day.component';
import { SalesPersonComponent } from './Components/Main/sales-person/sales-person.component';
import { ReturnOrderComponent } from './Components/Main/return-order/return-order.component';
import { OrderProductsComponent } from './Components/Main/home/order-products/order-products.component';
import { QuantityControlComponent } from './Components/Shared/quantity-control/quantity-control.component';
import { SummaryComponent } from './Components/Main/home/summary/summary.component';
import { FormsModule } from '@angular/forms';
import { SelectInputComponent } from './Components/Shared/select-input/select-input.component';
import { PaymentComponent } from './Components/Main/home/payment/payment.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { SettingsIndexComponent } from './Components/Main/Settings/index/index.component';
import { DiscountsIndexComponent } from './Components/Main/Discounts/index/index.component';
import { ReportsIndexComponent } from './Components/Main/Reports/index/index.component';
import { OrdersIndexComponent } from './Components/Main/Orders/index/index.component';
import { ProductsIndexComponent } from './Components/Main/Products/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    ActionBtnComponent,
    InputComponent,
    NavItemComponent,
    NavSalesPersonComponent,
    CustomersIndexComponent,
    SettingsIndexComponent,
    DiscountsIndexComponent,
    ReportsIndexComponent,
    OrdersIndexComponent,
    ProductsIndexComponent,
    EndDayComponent,
    SalesPersonComponent,
    ReturnOrderComponent,
    OrderProductsComponent,
    QuantityControlComponent,
    SummaryComponent,
    SelectInputComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
