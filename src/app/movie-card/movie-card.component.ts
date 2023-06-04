import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {IMovies} from "../models";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: IMovies[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  getGenre(movieId: string) {
    const movie = this.movies.find(mve => mve._id === movieId)
    if(!movie){
      return
    }
    this.snackBar.open(movie.Genre.Name, movie.Genre.Description);
  }

  getDirector(movieId: string) {
    const movie = this.movies.find(mve => mve._id === movieId)
    if(!movie){
      return
    }
    
    console.log(movie.Director.Name)
  }
  getDescription(movieId: string) {
    const movie = this.movies.find(mve => mve._id === movieId)
    if(!movie){
      return
    }
    
    console.log(movie.Description)
  }

  addMovieToFavorites(movieId: string){
    this.fetchApiData.addFavoriteMovie(movieId).subscribe({next:() => {
        console.log("movie added")
      }, error:(e) => {
        console.log(e)
      }})
  }
}
