import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})

export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}
  ngOnInit(): void {}

  // Navigates to movies page
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  // Navigates to user profile
  toProfile(): void {
    this.router.navigate(['profile']);
  }

  // logs out user, clears token and username from local storage
  logout(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
