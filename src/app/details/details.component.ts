import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post;
  id;
  size="size";
  constructor(private route: ActivatedRoute, private appService: AppService) { }

  ngOnInit(): void {
    this.post = history.state;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

  }
  addToCart(){
    if(this.size!=="size"){
      console.log(this.size);
      this.post[this.id]["size"] = this.size;
      this.post[this.id]["quantity"] = 1;
      this.appService.sendToCart(this.post[this.id]);
    }else{
      alert('select size!');
    }
    
  }

}
