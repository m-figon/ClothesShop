import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post;
  id;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.post = history.state;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));

  }

}
