import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void{
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open("Successfully Login", "OK", {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    });
  }
}
