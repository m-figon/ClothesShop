import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private http: HttpClient, private appService: AppService) { }
  users;
  id;
  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      this.users = data;
      for(let item of this.users){
        if(item.email===this.appService.getAccount()){
          this.id=item.id
        }
      }
      console.log(this.users[this.id].orders);
    })
  }

}
