import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account="YOUR ACCOUNT";
  cart = [];
  constructor() { }
  setAccount(value){
    this.account=value;
  }
  getCart(){
    return this.cart;
  }
  getAccount(){
    return(this.account);
  }
}
