import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, AfterViewInit {

  constructor(private http: HttpClient, private appService: AppService) { }
  private users: any[];
  public logedUser: string;
  private id: number;
  public email: string;
  public name: string;
  public surname: string;
  public currentPassword: string = "";
  public newPassword: string = "";
  public confirmPassword: string = "";
  public loadingFinished: boolean;
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
          this.email = this.users[this.id].email;
          this.name = this.users[this.id].name;
          this.surname = this.users[this.id].surname;
        }
      }
    })
  }
  ngAfterViewInit(): void  {
    this.loadingFinished = true;
  }
  changeData(): void  {
    let correctFlag = true;
    if (!(this.email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null)) {
      console.log('email correct');
    } else {
      correctFlag = false;
    }
    if (!(this.name.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
      console.log('name correct');
    } else {
      correctFlag = false;
    }
    if (!(this.surname.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null)) {
      console.log('surname correct');
    } else {
      correctFlag = false;
    }
    if (correctFlag) {
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
    }else{
      alert('wrong data')
    }
  }
  changePassword(): void  {
    if (this.users[this.id].password === this.currentPassword && this.newPassword === this.confirmPassword && !(this.newPassword.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null)) {
      this.http.put<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users/" + this.id, {
        email: this.users[this.id].email,
        name: this.users[this.id].name,
        surname: this.users[this.id].surname,
        password: this.newPassword,
        cart: this.users[this.id].cart,
        orders: this.users[this.id].orders,
        id: this.users[this.id].id
      }).toPromise().then(data => {
        console.log(data);
        alert('user password changed');
      })
    } else {
      alert("You chose wrong password")
    }
  }
}
