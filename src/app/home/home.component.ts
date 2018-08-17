import { Component, OnInit } from '@angular/core';
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
  allData: Array<any>;
  currentData: any;
  filterValue: string;
  filterArray = [
    { value: 'all', text: 'All' },
    { value: 'books', text: 'Books' },
    { value: 'characters', text: 'Characters' },
    { value: 'houses', text: 'Houses' }
  ];

  constructor(private apiClient: ApiService, 
            private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.apiClient.getAllData()
      .subscribe(response => {
        console.log(response);
        this.books = response['0'];
        this.characters = response['1'];
        this.houses = response['2'];
        this.allData =  Array.prototype.concat(response['0'], response['1'], response['2']); //[...response['0'], ...response['1'], ...response['2']];
        this.currentData = this.allData;
        this.filterValue = 'all'
        this.spinnerService.hide();
      })
  }

  onChange() {
    console.log(this.filterValue);
    if(this.filterValue === 'all') {
      this.currentData = this.allData
    } else if(this.filterValue === 'books') {
      this.currentData = this.books; 
    } else if(this.filterValue === 'characters') {
      this.currentData = this.characters;
    } else if(this.filterValue === 'houses') {
      this.currentData = this.houses;
    }
  }

  showDetails(index) {
    console.log(index);
    console.log(this.currentData[index])
  }

}
