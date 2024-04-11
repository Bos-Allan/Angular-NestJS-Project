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
  allMovies: Movie[] = [];
  movies: Movie[] = [];
  moviesRecherche: Movie[] = [];
  favoris: Favoris[] = [];
  groupsMovie: any[] = [];
  titre = ["Film et series populaires aujourd'hui", "Film d'action", "A Venir", "Les mieux notés"];
  groupsofGroup: any[] = [];
  hiddenCarousel: boolean = false;
  searchQuery: string = '';

  constructor(private router: Router, private http: HttpClient, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchMovieGroup()
    // this.searchService.searchResults$.subscribe(results => {
    //   this.movies = results;
    // });
    this.getFavoris();

  }

  searchMovieGroup(): void {
    const tabCarousel: string[] = ['trending/all/day', 'movie/now_playing', 'movie/upcoming', 'movie/top_rated'];
    for(let i = 0; i < tabCarousel.length; i++){
      this.searchMovies(tabCarousel[i]);
      this.groupMovie(this.groupsMovie);
      this.groupsofGroup.push(this.groupsMovie);
      this.groupsMovie = [];
    }

  }

  searchMovieName(): void {
    if (this.searchQuery.trim() !== '') {
      this.hiddenCarousel = true;
      this.http.get<any>(`https://api.themoviedb.org/3/search/multi?query=${this.searchQuery}&api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR`)
        .subscribe(response => {
          if (response.results && response.results.length > 0) {
            this.movies = response.results;
          }
        });
    } else {
      this.hiddenCarousel = false;
      this.searchMovieGroup();
      location.reload();
    }
  }


  
  searchMovies(url: string) {
    this.http.get<any>(`https://api.themoviedb.org/3/${url}?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR`)
      .subscribe(response => {
        if (response.results && response.results.length > 0) {
          this.movies = response.results;

        }
      });
      for(let i = 0; i < this.movies.length; i++){
      
        this.allMovies.push(this.movies[i]);
      }

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

  goToDetail(id: string, type: string) {
    if (type === undefined) {
      type = 'movie';
    }
    this.router.navigate(['/detail', id, type]); // Utilisez 'navigate' avec les paramètres requis
  }

  getFavoris() {
    this.http.get<any>(`http://localhost:3000/favoris`)
      .subscribe(response => {
        if (response && response.length > 0) {
          this.favoris = response; 
        }
      });
      for(let i = 0; i < this.allMovies.length; i++){

        if(this.favoris.find(f => f.id_film === this.allMovies[i].id)){
          this.allMovies[i].isFavoris = true;
        }else{
          this.allMovies[i].isFavoris = false;
        }
      }
  }

  addFavoris(id: string) {
    let idfavoris = Math.random().toString(36).substring(2, 15);
    const movie = this.allMovies.find(m => m.id === id);
    
    this.http.post<any>(`http://localhost:3000/favoris`, { id_favoris: idfavoris, id_film: id , isMovie: movie!.media_type === "movie" ? true : false})
      .subscribe();
    
      location.reload();
  }
  getFavorisId(idFilm: any): string {
    idFilm = idFilm.toString(); 
    for (let i = 0; i < this.favoris.length; i++) {
      if (this.favoris[i].id_film.toString() === idFilm.toString()) {
        return this.favoris[i].id_favoris;
      }
    }
    return "";
  }

  deleteFavoris(idFavoris:string) {
    this.http.delete<any>(`http://localhost:3000/favoris/${idFavoris}`)
    .subscribe();
    location.reload();
  }

}
