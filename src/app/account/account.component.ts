import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  Email="Email";
  Password="Password";
  Name="Name";
  Surname="Surname";
  login=true;
  register=false;
  users;
  emptyLogin;
  emptyPassword;
  wrongData;
  constructor(private http: HttpClient, private appService: AppService) { }
  changeView(){
    this.login=!this.login;
    this.register=!this.register;
    this.emptyLogin=false;
    this.emptyPassword=false;
    this.wrongData=false;
    this.Email="Email";
    this.Password="Password";
    this.Name="Name";
    this.Surname="Surname";
  }
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
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      console.log(this.users);
    })
  }
  loginFunc(){
    for(let item of this.users){
      if(this.Email===item.email && this.Password===item.password){
        alert('correct user');
        this.emptyLogin=false;
        this.emptyPassword=false;
        this.wrongData=false;
        this.appService.setAccount(this.Email);
      }
    }
    if(this.Email==="" || this.Email===" " || this.Email==="Email"){
      this.emptyLogin=true;
    }
    if(this.Password==="" || this.Password===" " || this.Password==="Password"){
      this.emptyPassword=true;
    }
    if(this.Email!=="" && this.Email!==" " && this.Email!=="Email" && this.Password!=="" && this.Password!==" " && this.Password!=="Password"){
      this.wrongData=true;
    }
  }

}
