import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit,AfterViewInit {
  public type: string;
  private lastType: string;
  private ad: string;
  public content;
  public loadingFinished: boolean;
  public fetchingFinished: boolean;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    setInterval(() => {
      this.lastType=this.type;
      this.type = (this.route.snapshot.paramMap.get('type'));
      if (this.type === "man" && (this.lastType==="woman" || !this.lastType)) {
        this.fetchingFinished=false;
        this.ad = "assets/img/man.jpg"
        this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/' + this.type).subscribe(data => {
          //console.log(data);
          this.content = data;
          this.fetchingFinished=true;
          console.log(this.content);
        })
      }
      if (this.type === "woman"  && (this.lastType==="man" || !this.lastType)) {
        this.fetchingFinished=false;
        this.ad = "assets/img/woman.jpg"
        this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/' + this.type).subscribe(data => {
          //console.log(data);
          this.content = data;
          this.fetchingFinished=true;
          console.log(this.content);
        })
      }
    }, 500)

  }
  ngAfterViewInit() {
    this.loadingFinished=true;
  }

}
