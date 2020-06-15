import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'clothes-shop';
  account="YOUR ACCOUNT";
  constructor(private appService: AppService){

  }
  ngOnInit(): void {
    setInterval(()=>{
      if(this.appService.getAccount()){
        this.account=this.appService.getAccount();
      }
    },500)
  }
}
