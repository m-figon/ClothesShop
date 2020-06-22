import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit,OnInit {

  constructor() { }
  loadingFinished;
  ngOnInit(){}
  ngAfterViewInit() {
    this.loadingFinished=true;
  }

}
