import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from "../fetch-api-data.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import {IMovies} from "../models";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: IMovies[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Gets all movies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      return this.movies;
    });
  }

  /**
   * gets genre
   * @param name genre name
   * @param description genre description
   */
  getGenre(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description
      },
    });
  }

  /**
   * get director
   * @param name director's name
   * @param description director's bio
   */
  getDirector(name: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: name,
        content: description
      },
    });
  }

  /**
   * Movie description
   * @param description 
   */
  getDescription(description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        content: description
      },
    });
  }

  /**
   * gets user's favorite movies
   */
  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      return this.favorites;
    });
  }

  /**
   * checks if movie is a favorite or not
   * @param id 
   * @returns 
   */
  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * uses movie ID and adds it to user's favorites
   * @param movieId 
   */
  addMovieToFavorites(movieId: string){
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result) => {
      this.snackBar.open('Movie added to favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
   * removes movie from favorites
   * @param movieId 
   */
  removeFavoriteMovie(movieId: string){
    console.log(movieId);
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result) => {
      this.snackBar.open('Movie removed from favorites', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }
}
