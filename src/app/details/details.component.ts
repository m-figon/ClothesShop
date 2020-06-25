import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit,AfterViewInit {
  post;
  id;
  size = "size";
  users;
  logedUser;
  type;
  details;
  loadingFinished;
  constructor(private http: HttpClient, private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.type = (this.route.snapshot.paramMap.get('type'));
    this.details = (this.route.snapshot.paramMap.get('details'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/'+this.type).subscribe(data => {
      //console.log(data);
      if(this.details==="tops"){
        this.post = data[0].content;
      }
      else if(this.details==="pants"){
        this.post = data[1].content;
      }
      else if(this.details==="sweatshirts"){
        this.post = data[2].content;
      }
      console.log(this.post);
    })
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      console.log(this.users);
    })
    setInterval(()=>{
      this.logedUser=this.appService.getAccount();
    },500)
  }
  accountCheck(){
    if(this.logedUser==="YOUR ACCOUNT"){
      return true;
    }else{
      return false;
    }
  }
  ngAfterViewInit() {
    this.loadingFinished=true;
  }
  addToCart() {
    if (this.size !== "size" && this.appService.getAccount()!=="YOUR ACCOUNT") {
      console.log(this.size);
      this.post[this.id]["size"] = this.size;
      //this.appService.sendToCart(this.post[this.id]);
      let tmp;
      for (let item of this.users) {
        if (item.email === this.appService.getAccount()) {
          tmp = item.cart.slice();
          tmp.push(this.post[this.id]);
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
            alert('item added to cart');
          })
        }
      }
    } else if(this.size === "size" && this.appService.getAccount()!=="YOUR ACCOUNT") {
      alert('select size!');
    }else if(this.appService.getAccount()==="YOUR ACCOUNT"){
      alert('user not logged');
    }
  }

}
