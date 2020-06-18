import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private http: HttpClient, private appService: AppService) { }
  cart;
  users;
  id;
  cartInit(){
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      console.log(this.users);
      for (let item of this.users) {
        if (item.email === this.appService.getAccount()) {
          this.cart= item.cart.slice();
          console.log(this.cart);
        }
      }
    })
  }
  ngOnInit(): void {
    this.cartInit();
  }
  deleteItem(id){
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
