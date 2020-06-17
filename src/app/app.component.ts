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
  woman=false;
  man=false;
  constructor(private appService: AppService){

  }
  hoverFunc(type){
    eval('this.'+type+'= !this.'+type);
  }
  closeFunc(){
    this.woman=false;
    this.man=false;
  }
  ngOnInit(): void {
    setInterval(()=>{
      if(this.appService.getAccount()){
        this.account=this.appService.getAccount();
      }
    },500)
  }
}
