import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.type';
import { SearchService } from '../header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe(results => {
      this.movies = results;
    });
  }

  addFavoris(id: string) {
    let idfavoris = Math.random().toString(36).substring(2, 15);
    const movie = this.movies.find(m => m.id === id);
    
    this.http.post<any>(`http://localhost:3000/favoris`, { id_favoris: idfavoris, id_film: id , isMovie: movie!.media_type === "movie" ? true : false})
      .subscribe(response => {
        console.log(response);
        // Vous pouvez ajouter ici du code pour gérer la réponse du serveur
      });
  }
}
