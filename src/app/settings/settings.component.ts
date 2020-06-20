import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

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

}
