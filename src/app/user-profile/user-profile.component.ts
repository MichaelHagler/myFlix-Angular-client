import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import {IMovies, IUser} from "../models";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  //input form for users to update profile
  updatedUser: IUser = {
    username: "",
    password: "",
    email: "",
    birthDate: "",
    FavoriteMovies:[]
  }

  user: IUser = {
    username: "",
    password: "",
    email: "",
    birthDate: "",
    FavoriteMovies:[]
  };
  movies: IMovies[] = [];
  favorites: IMovies[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.getUser();
    this.getFavorites()
  }

  /**
   * gets favorite movies
   */
  getFavorites(): void {
      this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favorites = resp.filter((movie: IMovies) => this.user.FavoriteMovies.includes(movie._id));
      return this.favorites;
    });
  }
  // isFavorite(id: string): boolean {
  //   return this.favorites.includes(id);
  // }

  /**
   * adds movie to favorites
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

  /**
   * get user's current information
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp) => {
      console.log(resp)
      this.user = resp;
      this.updatedUser.username = this.user.username;
      this.updatedUser.email = this.user.email;
      this.updatedUser.birthDate = this.user.birthDate;
      return this.user;
    });
  }

  /**
   * updates user information 
   */
  updateUserData(): void {
    this.fetchApiData.editUser(this.updatedUser).subscribe((result) => {
      this.snackBar.open("User profile updated", "OK", {
        duration: 2000,
      });
      localStorage.setItem("username", result.username);
      window.location.reload();
    });
  }

  deleteUser(): void {
    if (
      confirm(
        "You are about to delete your account and all your data will be lost! Are you sure?"
      )
    ) {
      this.router.navigate(["welcome"]).then(() => {
        this.snackBar.open(
          "Account deleted successfully", "OK", {
            duration: 2000
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        localStorage.clear();
      });
    }
  }
}
