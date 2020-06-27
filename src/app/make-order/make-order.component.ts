import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit,AfterViewInit {
  private tmp: any[];
  private number: number=-1;
  public cart: any[]=[];
  public email: string="";
  public name: string="";
  public surname: string="";
  public city: string="";
  public postCode: string="";
  public street: string="";
  public wrongEmail: boolean;
  public wrongName: boolean;
  public wrongSurname: boolean;
  public wrongCity: boolean;
  public wrongPostCode: boolean;
  public wrongStreet: boolean;
  public beginning: boolean;
  private users: any[];
  private logedUser: string;
  private id: number;
  public loadingFinished: boolean;
  constructor(private route: ActivatedRoute, private http: HttpClient, private appService: AppService) { }

  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      this.users = data;
      this.logedUser = this.appService.getAccount();
      for(let item of this.users){
        if(item.email===this.appService.getAccount()){
          this.id=item.id
          this.email=item.email;
          this.name=item.name;
          this.surname=item.surname;
        }
      }
      console.log(this.users[this.id]);
    })      //console.log(data);

    this.tmp=history.state;
    console.log(this.tmp);
    for(let item in this.tmp){
      this.number++;
    }
    for(let i=0; i<this.number;i++){
      this.cart.push(this.tmp[i]);
    }
    for(let item of this.cart){
     item["date"] = moment().format('LL');
    }
    console.log(this.cart);
  }
  ngAfterViewInit(): void {
    this.loadingFinished=true;
  }
  changeStep(): void {
    if(!this.beginning){
      if(this.city && this.postCode && this.street && this.email && this.name && this.surname){
        let correctFlag=true;
          if(!(this.postCode.match(/^([0-9]{2})([\-]{1}[0-9]{3})?$/) === null)){
            this.wrongPostCode=false;
          }else{
            this.wrongPostCode=true;
            correctFlag=false;
          }
          if (!(this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null)) {
            this.wrongEmail=false;
          }else{
            this.wrongEmail=true;
            correctFlag=false;
          }
          if (!(this.name.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
            this.wrongName=false;
          }else{
            this.wrongName=true;
            correctFlag=false;
          }
          if (!(this.surname.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
            this.wrongSurname=false;
          }else{
            this.wrongSurname=true;
            correctFlag=false;
          }
          if(correctFlag){
            this.beginning=!this.beginning;
          } 
      }else{
        alert("fill all inputs");
      }
    }
    else if(this.beginning){
      this.beginning=!this.beginning;
    }
  }
  createOrder(): void {
    for (let item of this.users) {
      if (item.email === this.appService.getAccount()) {
        for(let item of this.cart){
          item["city"] =this.city;
          item["postCode"] =this.postCode;
          item["street"] =this.street;
         }
        this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + item.id, {
          email: item.email,
          name: item.name,
          surname: item.surname,
          password: item.password,
          cart: [],
          orders: this.cart,
          id: item.id
        }).toPromise().then(data => {
          console.log(data);
          alert('order created');
        })
      }
    }
  }
}
