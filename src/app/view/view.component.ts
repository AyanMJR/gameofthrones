import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  selectedData: any;
  category: string;

  constructor(private route: ActivatedRoute,
          private location: Location,
          private apiClient: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let index = params['id']
      this.selectedData = this.apiClient.currentData[params['id']];
      this.category = this.getCategory()
    });
  }

  getCategory() {
    if(this.selectedData.url.includes('books') == true) {
      return 'books';
    } else if(this.selectedData.url.includes('characters') == true) {
      return 'characters';
    } else if(this.selectedData.url.includes('houses') == true) {
      return 'houses';
    }
  }

  goBack() {
    this.location.back();
  }

}
