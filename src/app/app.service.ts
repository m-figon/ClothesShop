import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public account: string="YOUR ACCOUNT";
  constructor() { }
  setAccount(value){
    this.account=value;
  }
  getAccount(){
    return(this.account);
  }
}
