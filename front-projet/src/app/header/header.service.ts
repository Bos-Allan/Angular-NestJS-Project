import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Movie } from '../shared/movie.type';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResultsSubject = new BehaviorSubject<Movie[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  constructor() {}

  updateSearchResults(results: Movie[]) {
    this.searchResultsSubject.next(results);
  }
}
