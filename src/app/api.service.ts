import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private base_url = "https://www.anapioficeandfire.com/api/";

  constructor(private http: HttpClient) { }

  getAllData() {
    let books = this.http.get(this.base_url + 'books');
    let characters = this.http.get(this.base_url + 'characters');
    let houses = this.http.get(this.base_url + 'houses')
    return forkJoin([books, characters, houses])
  }
}
