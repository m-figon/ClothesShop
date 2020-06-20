import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-order',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css']
})
export class MakeOrderComponent implements OnInit {
  tmp;
  number=-1;
  cart=[];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
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

}
