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
  favorites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ){ }

  ngOnInit(): void {
    this.getUser();
  }

  getFavoriteMovies(): void{
    const favoriteMovies = this.movies.filter(m => this.user.FavoriteMovies.includes(m._id));
  }

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
