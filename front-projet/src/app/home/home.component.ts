import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/movie.type';
import { SearchService } from '../header/header.service';
import { Favoris } from '../shared/favoris.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  favoris: Favoris[] = [];
  constructor(private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchResults$.subscribe(results => {
      this.movies = results;
      this.getFavoris();
      
    
    });


  }

  getFavoris() {
    this.http.get<any>(`http://localhost:3000/favoris`)
      .subscribe(response => {
        if (response && response.length > 0) {
          this.favoris = response; 
        }
      });
      for(let i = 0; i < this.movies.length; i++){
        if(this.favoris.find(f => f.id_film === this.movies[i].id)){
          this.movies[i].isFavoris = true;
        }else{
          this.movies[i].isFavoris = false;
        }
      }
  }

  addFavoris(id: string) {
    let idfavoris = Math.random().toString(36).substring(2, 15);
    const movie = this.movies.find(m => m.id === id);
    
    this.http.post<any>(`http://localhost:3000/favoris`, { id_favoris: idfavoris, id_film: id , isMovie: movie!.media_type === "movie" ? true : false})
      .subscribe();
      location.reload();
      
  }
  getFavorisId(idFilm: any): string {
    idFilm = idFilm.toString(); 

    let movie = this.favoris.find(m => m.id_film === idFilm);
    console.log(movie);
    
    for (let i = 0; i < this.favoris.length; i++) {
      if (this.favoris[i].id_film.toString() === idFilm.toString()) {
        console.log(this.favoris[i].id_favoris);
        return this.favoris[i].id_favoris;
      }
    }
    return "";
  }

  deleteFavoris(idFavoris:string) {
    console.log(idFavoris);
    
    this.http.delete<any>(`http://localhost:3000/favoris/${idFavoris}`)
    .subscribe();
    location.reload();

  }

}
