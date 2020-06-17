import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  type;
  man;
  content;
  ngOnInit(): void {
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/man').subscribe(data => {
      //console.log(data);
      this.man = data;
      console.log(this.man);
      this.type = (this.route.snapshot.paramMap.get('details'));
      console.log(this.type);
      for(let item of this.man){
        if(item.type===this.type){
          this.content=item.content.slice();
          console.log(this.content);
        }
      }
    })
      
  
  }

}
