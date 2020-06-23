import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit,AfterViewInit {

  constructor(private http: HttpClient, private appService: AppService) { }
  users;
  logedUser;
  id;
  email;
  name;
  surname;
  currentPassword="";
  newPassword="";
  confirmPassword="";
  changingData=true;
  changingPassword=false;
  loadingFinished;
  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      this.logedUser = this.appService.getAccount();
      console.log(this.users);
      for (let item of this.users) {
        if (item.email === this.appService.getAccount()) {
          this.id = item.id;
          console.log(this.users[this.id]);
          this.email=this.users[this.id].email;
          this.name=this.users[this.id].name;
          this.surname=this.users[this.id].surname;
        }
      }
    })
  }
  ngAfterViewInit() {
    this.loadingFinished=true;
  }
  changeData(){
    if(!this.changingPassword && this.changeData){
      this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + this.id, {
        email: this.email,
        name: this.name,
        surname: this.surname,
        password: this.users[this.id].password,
        cart: this.users[this.id].cart,
        orders: this.users[this.id].orders,
        id: this.users[this.id].id
      }).toPromise().then(data => {
        console.log(data);
        alert('user data changed');
      })
    }
    if(this.changingPassword && this.changeData){
      if(this.users[this.id].password===this.currentPassword && this.newPassword===this.confirmPassword){
        this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + this.id, {
        email: this.email,
        name: this.name,
        surname: this.surname,
        password: this.newPassword,
        cart: this.users[this.id].cart,
        orders: this.users[this.id].orders,
        id: this.users[this.id].id
      }).toPromise().then(data => {
        console.log(data);
        alert('user password changed');
      })
      }else{
        alert("You chose wrong password")
      }
    }
    if(this.changingPassword && !this.changeData){
      if(this.users[this.id].password===this.currentPassword && this.newPassword===this.confirmPassword){
        this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + this.id, {
        email: this.users[this.id].email,
        name: this.users[this.id].name,
        surname:this.users[this.id].surname,
        password: this.newPassword,
        cart: this.users[this.id].cart,
        orders: this.users[this.id].orders,
        id: this.users[this.id].id
      }).toPromise().then(data => {
        console.log(data);
        alert('user password changed');
      })
      }else{
        alert("You chose wrong password")
      }
    }
        
  }

}
