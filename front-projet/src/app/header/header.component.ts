import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  movies: Movie[] = [];

  constructor(private router: Router, private http: HttpClient) {}
  
  ngOnInit(): void {}
  
  goToHome() {
    const navigationExtras: NavigationExtras = { state: { reload: true } };
    this.router.navigate(['home'], navigationExtras).then(() => {
      window.location.reload();
    });
  }

  goToFavoris() {
    const navigationExtras: NavigationExtras = { state: { reload: true } };
    this.router.navigate(['favoris'], navigationExtras).then(() => {
      window.location.reload();
    });
  }
}
