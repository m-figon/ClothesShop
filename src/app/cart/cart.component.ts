import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private appService: AppService) { }
  cart;
  ngOnInit(): void {
      this.cart=this.appService.getCart();
  }
  deleteItem(id){
    this.cart.splice(id,1);
  }

}
