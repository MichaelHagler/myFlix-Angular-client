import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//my imports
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatIconModule } from "@angular/material/icon";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {DialogModule} from "@angular/cdk/dialog";
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    UserLoginFormComponent,
    UserProfileComponent,
    NavbarComponent,
    MovieInfoComponent
  ],
  imports: [
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    DialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
