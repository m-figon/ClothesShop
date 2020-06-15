import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  Email="Email";
  Password="Password";
  constructor() { }
  focus(value1){
    //console.log(value1);
    if(eval('this.'+value1)===value1){
      eval('this.'+value1+"=''")
    }
  }
  blur(value1){
    //console.log('this.'+value1+"="+"'"+value1+"'");
    if(eval('this.'+value1)===''){
      eval('this.'+value1+"="+"'"+value1+"'")
    }
  }
  ngOnInit(): void {
  }

}
