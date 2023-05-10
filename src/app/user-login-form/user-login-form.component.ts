import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {
  @Input() userData = { username: "", password: ""};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void{
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem("user", result.user.username);
      localStorage.setItem("token", result.token);
      this.dialogRef.close();
      this.snackBar.open("User Login Successful", "OK", {
        duration: 2000
      });
      this.router.navigate(["movies"]);
    }, (result) => {
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }
}
