import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit,OnInit {

  constructor() { }
  public loadingFinished: boolean;
  ngOnInit(){}
  ngAfterViewInit() {
    this.loadingFinished=true;
  }

}
