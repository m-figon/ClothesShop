import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  type;
  ad;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    setInterval(()=>{
      this.type = (this.route.snapshot.paramMap.get('type'));
    if(this.type==="man"){
      this.ad="assets/img/man.jpg"
    }
    if(this.type==="woman"){
      this.ad="assets/img/woman.jpg"
    }
    },500)
    
  }

}
