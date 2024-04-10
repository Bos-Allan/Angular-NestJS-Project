import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  moviesRecherche: Movie[] = [];
  favoris: Favoris[] = [];
  groupsMovie: any[] = [];
  titre = ["Film et series populaires aujourd'hui", "Film d'action", "A Venir", "Les mieux notés"];
  groupsofGroup: any[] = [];

  constructor(private router: Router, private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {

    this.searchMovies('trending/all/day');
    this.groupMovie(this.groupsMovie);
    this.groupsofGroup.push(this.groupsMovie);
    this.groupsMovie = [];
    this.searchMovies('movie/now_playing');
    this.groupMovie(this.groupsMovie);
    this.groupsofGroup.push(this.groupsMovie);
    this.groupsMovie = [];
    this.searchMovies('movie/upcoming');
    this.groupMovie(this.groupsMovie);
    this.groupsofGroup.push(this.groupsMovie);
    this.groupsMovie = [];
    this.searchMovies('movie/top_rated');
    this.groupMovie(this.groupsMovie);
    this.groupsofGroup.push(this.groupsMovie);
    this.groupsMovie = [];

    this.searchService.searchResults$.subscribe(results => {
      this.movies = results;
    });

  }

  searchMovies(url: string) {
    this.http.get<any>(`https://api.themoviedb.org/3/${url}?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR`)
      .subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.movies = response.results;
          console.log(this.movies);
          
        }
      });
  }


  groupMovie(moviesGroup: any[]){
    
    let index = 0;
    let tab = [];
 
    for (let i = 0; i < this.movies.length ; i++) {

      
      if(index < 6 ){        
        tab.push(this.movies[i]);
        index++;
      }else{
        index = 0;
        tab.push(this.movies[i]);
        moviesGroup.push(tab);
        tab = [];
      }
    }
    moviesGroup.push(tab);

    this.getFavoris();
    
  }

  //a voir comment tu veux gerer ca et la route qu'il faut mettre
  goToDetail(id: string, type: string) {
    this.router.navigate(['/detail', id, type]); // Utilisez 'navigate' avec les paramètres requis
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
    console.log(movie?.media_type);
    
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
