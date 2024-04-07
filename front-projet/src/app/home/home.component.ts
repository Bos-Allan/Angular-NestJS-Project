import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.type';

//shared pour voir le type de movie


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
