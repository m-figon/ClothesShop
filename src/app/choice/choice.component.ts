import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit,AfterViewInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }
  public gender: string;
  public type: string;
  private lastType: string;
  private tmp: any[];
  public loadingFinished: boolean;
  public fetchingFinished: boolean;
  public content: any[];
  ngOnInit(): void {
    this.gender = (this.route.snapshot.paramMap.get('type'));
    this.http.get<any>('https://rocky-citadel-32862.herokuapp.com/ClothesShop/'+this.gender).subscribe(data => {
      //console.log(data);
      this.tmp = data;
      this.fetchingFinished=true;
      console.log(this.tmp);
    })
    setInterval(()=>{
      this.lastType=this.type;
      this.type = (this.route.snapshot.paramMap.get('details'));
      if(this.lastType!==this.type){
        for(let item of this.tmp){
          if(item.type===this.type){
            this.content=item.content.slice();
            console.log(this.content);
          }
        }
      }
    },500)
  }
  ngAfterViewInit(): void  {
    this.loadingFinished=true;
  }

}
