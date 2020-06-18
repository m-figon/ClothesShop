import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account;
  cart = [];
  constructor() { }
  setAccount(value){
    this.account=value;
    console.log(value);
  }
  sendToCart(value){
    this.cart.push(value);
    console.log(this.cart);
  }
  getCart(){
    return this.cart;
  }
  getAccount(){
    return(this.account);
  }
}
