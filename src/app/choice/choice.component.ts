import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  gender;
  type;
  man;
  @Input() public content;
  ngOnInit(): void {
    this.gender = (this.route.snapshot.paramMap.get('type'));

    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/'+this.gender).subscribe(data => {
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
