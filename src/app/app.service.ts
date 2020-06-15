import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  account;
  constructor() { }
  setAccount(value){
    this.account=value;
    console.log(value);
  }
  getAccount(){
    return(this.account);
  }
}
