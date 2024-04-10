import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../shared/movie.type';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fillArray'
})

export class FillArrayPipe implements PipeTransform {
  transform(value: number): any {
    return new Array(value);
  }
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})

export class DetailComponent {
  id!: string;
  type! : string;
  media!: Movie;
  data: any;
  totalRuntime: number =0;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.type = params['type'];
      this.loadData();
    });
  }

  loadData() {
    let apiUrl: string ='';

    if (this.type === 'movie') {
      apiUrl = `https://api.themoviedb.org/3/movie/${this.id}?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR`;
    } else if (this.type === 'tv') {
      apiUrl = `https://api.themoviedb.org/3/tv/${this.id}?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR`;
    }

    if (apiUrl) {
      this.http.get<any>(apiUrl).subscribe(data => {
        this.media = data;
        this.media.release_date_frmv = new Date(this.media.release_date).toLocaleDateString('fr-FR');
        this.media.release_date_frse = new Date(this.media.first_air_date).toLocaleDateString('fr-FR');
        this.calculateTotalRuntime();
      });
    } else {
      console.error('Type de média non pris en charge');
    }
  }
  
  //https://api.themoviedb.org/3/movie/$this.id}/credits?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR
  //https://api.themoviedb.org/3/tv/$this.id}/credits?api_key=fd12b26e656b74c2cdee344670e2e913&language=fr-FR

  calculateTotalRuntime() {
    return 0
  }

  calculateStarFill() {
    const average = Math.floor(this.media.vote_average);
    return average;
  }
  
}