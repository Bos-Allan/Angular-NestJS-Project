import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.type';
import { SearchService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];

  constructor(private router: Router, private http: HttpClient, private searchService: SearchService) {}
  
  ngOnInit(): void {
    this.searchMovies();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToFavoris() {
    const navigationExtras: NavigationExtras = { state: { reload: true } };
    this.router.navigate(['favoris'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  searchMovieName(): void {
    if (this.searchQuery.trim() !== '') {
      this.http.get<any>(`https://api.themoviedb.org/3/search/multi?query=${this.searchQuery}&api_key=fd12b26e656b74c2cdee344670e2e913`)
        .subscribe(response => {
          if (response.results && response.results.length > 0) {
            this.searchService.updateSearchResults(response.results);
          }
        });
    } else {
      this.searchMovies();
    }
  }

  searchMovies() {
    this.http.get<any>(`https://api.themoviedb.org/3/trending/all/day?api_key=fd12b26e656b74c2cdee344670e2e913`)
      .subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.searchService.updateSearchResults(response.results); 
        }
      });
  }
  
}
