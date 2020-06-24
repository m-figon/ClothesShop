import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account="slickj@gmail.com";
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
