import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: any;
  characters: any;
  houses: any;
  allData: any;
  filterValue: string;
  filterArray = [
    { value: 'all', text: 'All' },
    { value: 'books', text: 'Books' },
    { value: 'characters', text: 'Characters' },
    { value: 'houses', text: 'Houses' }
  ];

  constructor(public apiClient: ApiService,
            private router: Router, 
            private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.apiClient.getAllData()
      .subscribe(response => {
        this.books = response['0'];
        this.characters = response['1'];
        this.houses = response['2'];
        this.allData =  Array.prototype.concat(response['0'], response['1'], response['2']); 
        this.apiClient.currentData = this.allData;
        this.filterValue = 'all'
        this.spinnerService.hide();
      })
  }

  onChange() {
    if(this.filterValue === 'all') {
      this.apiClient.currentData = this.allData
    } else if(this.filterValue === 'books') {
      this.apiClient.currentData = this.books; 
    } else if(this.filterValue === 'characters') {
      this.apiClient.currentData = this.characters;
    } else if(this.filterValue === 'houses') {
      this.apiClient.currentData = this.houses;
    }
  }

  showDetails(index) {
    this.router.navigate(['view', index]);
  }

}
