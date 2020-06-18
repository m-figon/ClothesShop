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
    /*
    for(let item of this.cart){
      if(item.name===value.name && item.size===value.size){
        value.quantity++;
        console.log(this.cart);
        return;
      }
    }
    */
   console.log(value);
    this.cart.push(value);
    console.log(this.cart);
    return;
  }
  getCart(){
    return this.cart;
  }
  getAccount(){
    return(this.account);
  }
}
