import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {
  tmp;
  number=-1;
  cart=[];
  email="";
  name="";
  surname="";
  city="";
  postCode="";
  street="";
  beginning;
  users;
  logedUser;
  id;
  constructor(private route: ActivatedRoute, private http: HttpClient, private appService: AppService) { }

  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
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
    })
    this.tmp=history.state;
    console.log(this.tmp);
    for(let item in this.tmp){
      this.number++;
    }
    for(let i=0; i<this.number;i++){
      this.cart.push(this.tmp[i]);
    }
    for(let item of this.cart){
     item["date"] = new Date();
    }
    console.log(this.cart);
  }
  changeStep(){
    if(!this.beginning){
      if(this.city && this.postCode && this.street){
        this.beginning=!this.beginning;
      }else{
        alert("fill all inputs");
      }
    }
    else if(this.beginning){
      this.beginning=!this.beginning;
    }
  }
  createOrder() {
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
