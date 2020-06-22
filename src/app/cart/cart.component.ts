import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,AfterViewInit {

  constructor(private http: HttpClient, private appService: AppService) { }
  cart;
  users;
  id;
  logedUser;
  newOrder;
  price=0;
  loadingFinished;
  cartInit() {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      this.logedUser = this.appService.getAccount();
      console.log(this.users);
      for (let item of this.users) {
        if (item.email === this.appService.getAccount()) {
          this.cart = item.cart.slice();
          console.log(this.cart);
        }
      }
      for(let item of this.cart){
        this.price+=(item.price-item.discount);
      }
    })
  }
  ngOnInit(): void {
    this.cartInit();
  }
  ngAfterViewInit() {
    this.loadingFinished=true;
  }
  deleteItem(id) {
    let tmp;
    for (let item of this.users) {
      if (item.email === this.appService.getAccount()) {
        tmp = item.cart.slice();
        tmp.splice(id, 1);
        console.log(tmp);
        this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + item.id, {
          email: item.email,
          name: item.name,
          surname: item.surname,
          password: item.password,
          cart: tmp,
          orders: item.orders,
          id: item.id
        }).toPromise().then(data => {
          console.log(data);
          alert('item deleted');
          this.cartInit();
        })
      }
    }
  }
}
