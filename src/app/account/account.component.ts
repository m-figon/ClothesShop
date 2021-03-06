import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  public Email: string = "Email";
  public Password: string = "Password";
  public Name: string = "Name";
  public resetEmail: string = "Email"
  public resetPassword: string = "New Password";
  public Surname: string = "Surname";
  public login: boolean = true;
  public register: boolean = false;
  public passwordType: string = "text";
  public users: any[];
  public emptyEmail: boolean;
  public emptyPassword: boolean;
  public emptyName: boolean;
  public emptySurname: boolean;
  public wrongData: boolean;
  public tooltip: boolean;
  public loadingFinished: boolean;
  constructor(private http: HttpClient, private appService: AppService) { }
  changeView(): void {
    this.login = !this.login;
    this.register = !this.register;
    this.emptyEmail = false;
    this.emptyPassword = false;
    this.emptyName = false;
    this.emptySurname = false;
    this.wrongData = false;
    this.Email = "Email";
    this.Password = "Password";
    this.Name = "Name";
    this.Surname = "Surname";
    this.passwordType="text";
  }
  ngAfterViewInit(): void  {
    this.loadingFinished = true;
  }
  focus(value1: string): void  {
    //console.log(value1);
    if (eval('this.' + value1) === value1) {
      eval('this.' + value1 + "=''")
      if (value1 === "Password") {
        this.passwordType = "password";
      }
    }
    if (value1 === "resetEmail" && this.resetEmail === "Email") {
      this.resetEmail = "";
    }
    if (value1 === "resetPassword" && this.resetPassword === "New Password") {
      this.resetPassword = "";
      this.passwordType = "password";
    }

  }
  blur(value1: string) : void {
    //console.log('this.'+value1+"="+"'"+value1+"'");
    if (eval('this.' + value1) === '') {
      eval('this.' + value1 + "=" + "'" + value1 + "'")
      if (value1 === "Password") {
        this.passwordType = "text";
      }
    }
    if (value1 === "resetEmail" && (this.resetEmail === " " || this.resetEmail === "" || this.resetEmail === "resetEmail")) {
      this.resetEmail = "Email";
    }
    if (value1 === "resetPassword" && (this.resetPassword === " " || this.resetPassword === "" || this.resetPassword === "resetPassword")) {
      this.resetPassword = "New Password";
      this.passwordType = "text";
    }

  }
  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/users').subscribe(data => {
      //console.log(data);
      this.users = data;
      console.log(this.users);
    })
  }
  loginFunc(): void  {
    if (this.Email === "" || this.Email === " " || this.Email === "Email") {
      this.emptyEmail = true;
    }
    if (this.Password === "" || this.Password === " " || this.Password === "Password") {
      this.emptyPassword = true;
    }
    if (this.Email === "" || this.Email === " " || this.Email === "Email" || this.Password === "" || this.Password === " " || this.Password === "Password") {
      this.wrongData = true;
    }

    for (let item of this.users) {
      if (this.Email === item.email && this.Password === item.password) {
        alert('correct user');
        this.emptyEmail = false;
        this.emptyPassword = false;
        this.emptyName = false;
        this.emptySurname = false;
        this.wrongData = false;
        this.appService.setAccount(this.Email);
        this.Email = "Email";
        this.Password = "Password";
        this.Name = "Name";
        this.Surname = "Surname";
        this.passwordType="text";
      }
    }
    
  }
  showHideTooltip(value: boolean): void {
    this.tooltip = value;
    this.Email = "Email";
    this.Password = "Password";
    this.resetEmail = "Email";
    this.resetPassword = "New Password";
    this.passwordType = "text";
  }
  changePassword(): void  {
    let correctFlag=false;
    for (let item of this.users) {
      if (item.email === this.resetEmail) {
        alert('email sent');
        correctFlag=true;
      }
    }
    if(!correctFlag){
      alert('these email is not used in our page');
    }
  }
  registerFunc(): void  {
    let correctFlag = true;
    if (!(this.Email.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null) && this.Email !== "" && this.Email !== " " && this.Email !== "Email") {
      console.log('email correct');
      this.emptyEmail = false;
    } else {
      this.emptyEmail = true;
      correctFlag = false;
    }
    if (!(this.Name.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null) && this.Name !== "" && this.Name !== " " && this.Name !== "Name") {
      console.log('name correct');
      this.emptyName = false;
    } else {
      this.emptyName = true;
      correctFlag = false;
    }
    if (!(this.Surname.match(/^[a-zA-Z0-9\.\-_]{4,10}$/) === null) && this.Surname !== "" && this.Surname !== " " && this.Surname !== "Surname") {
      console.log('surname correct');
      this.emptySurname = false;
    } else {
      this.emptySurname = true;
      correctFlag = false;
    }
    if (!(this.Password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null) && this.Password !== "" && this.Password !== " " && this.Password !== "Password") {
      console.log('password correct');
      this.emptyPassword = false;
    } else {
      this.emptyPassword = true;
      correctFlag = false;
    }
    if (correctFlag) {
      this.http.post<any>("https://rocky-citadel-32862.herokuapp.com/ClothesShop/users", {
        email: this.Email,
        name: this.Name,
        surname: this.Surname,
        password: this.Password,
        cart: [],
        orders: []
      }).toPromise().then(data => {
        console.log(data);
        this.emptyEmail = false;
        this.emptyPassword = false;
        this.emptyName = false;
        this.emptySurname = false;
        this.wrongData = false;
        this.Email = "Email";
        this.Password = "Password";
        this.Name = "Name";
        this.Surname = "Surname";
        this.passwordType="text";
        alert('new user created');
      })
    } else {
      this.wrongData = true;
    }
  }

}
