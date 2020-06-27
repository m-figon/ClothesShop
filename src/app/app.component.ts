import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public account: string="YOUR ACCOUNT";
  public ac: boolean=false;
  constructor(private appService: AppService){

  }
  hoverFunc(type){
    eval('this.'+type+'= !this.'+type);
  }
  logout(){
    this.ac=false;
    this.appService.setAccount("YOUR ACCOUNT");
    this.account=this.appService.getAccount();
  }
  accountCheck(){
    if(this.account!=="YOUR ACCOUNT"){
      return true;
    }else{
      return false;
    }
  }
  ngOnInit(): void {
    setInterval(()=>{
      if(this.appService.getAccount()){
        this.account=this.appService.getAccount();
      }
    },500)
  }
}
