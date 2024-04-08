import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Favoris } from '../shared/favoris.type';
import { Movie } from '../shared/movie.type';



@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrl: './favoris.component.css'
})
export class FavorisComponent {

  movies: Movie[] = [];
  series: Movie[] = [];

  favoris: Favoris[] = [];
  tabIdFavoris: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchMovie();
  }



  searchMovie() { 
    this.getFavoris();
    for (let i = 0; i < this.tabIdFavoris.length; i++) {
      if(this.favoris[i].isMovie === true){
        this.http.get<any>(`https://api.themoviedb.org/3/movie/${this.tabIdFavoris[i]}?api_key=fd12b26e656b74c2cdee344670e2e913`)
        .subscribe(response => {
            this.movies.push(response);
        });
      }else{
        this.http.get<any>(`https://api.themoviedb.org/3/tv/${this.tabIdFavoris[i]}?api_key=fd12b26e656b74c2cdee344670e2e913`)
        .subscribe(response => {
            this.series.push(response);
        });
      }
    }
  }



  getFavoris() {
    this.http.get<any>(`http://localhost:3000/favoris`)
      .subscribe(response => {
        if (response && response.length > 0) {
          this.favoris = response; 
          for (let i = 0; i < this.favoris.length; i++) {
            this.tabIdFavoris.push(this.favoris[i].id_film);
          }
        }
      });
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
    this.http.delete<any>(`http://localhost:3000/favoris/${idFavoris}`)
    .subscribe(response => {
      console.log(response);
    });
    location.reload();
  }
}
