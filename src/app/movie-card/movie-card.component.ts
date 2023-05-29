import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import {IMovies} from "../models";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: IMovies[] = [];
  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
    *API call to get all movies 
  */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * opens a dialog to show information about the genre of the movie
   * 
   * @param Name genre type
   * @param Description describes what the genre is
   */
  getGenreInfo(Name: string, Description: string) {
    this.fetchApiData.getGenre(Name, Description).subscribe({next:() => {
      console.log("Getting genre details")
    }, error:(e) => {
      console.log(e)
    }})
  }

  addMovieToFavorites(movieId: string){
    this.fetchApiData.addFavoriteMovie(movieId).subscribe({next:() => {
        console.log("movie added")
      }, error:(e) => {
        console.log(e)
      }})
  }
}
