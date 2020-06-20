import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeComponent } from './home/home.component';
import { OfferComponent } from './offer/offer.component';
import { CartComponent } from './cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { ChoiceComponent } from './choice/choice.component';
import { SettingsComponent } from './settings/settings.component';
import { OrdersComponent } from './orders/orders.component';
import { MakeOrderComponent } from './make-order/make-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/settings', component: SettingsComponent },
  { path: 'account/orders', component: OrdersComponent },
  { path: 'makeOrder', component: MakeOrderComponent },
  { path: 'cart', component: CartComponent },
  { path: ':type', component: OfferComponent },
  { path: ':type/:details', component: ChoiceComponent },
  { path: ':type/:details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
