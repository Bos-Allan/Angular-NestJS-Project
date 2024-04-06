import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchMovie();
  }

  searchMovie() {
    this.http.get<any>(`https://api.themoviedb.org/3/trending/all/day?api_key=fd12b26e656b74c2cdee344670e2e913`)
      .subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.movies = response.results;
        }
      });
  }
}
