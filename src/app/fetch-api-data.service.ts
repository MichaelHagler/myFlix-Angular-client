import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {IMovies, IUserLogin, IUserLoginResponse, IUserRegister} from "./models";

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-flixcf.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  // Making the api call for the user registration endpoint
  userRegistration(userDetails: IUserRegister): Observable<any> {
    return this.http.post(`${apiUrl}/users`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for the login endpoint
  userLogin(userDetails: IUserLogin): Observable<IUserLoginResponse> {
    return this.http.post<IUserLoginResponse>(`${apiUrl}/login`, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //Making the api call for all movies endpoint
  getAllMovies(): Observable<IMovies[]> {
    const token = localStorage.getItem('token');
    return this.http
      .get<IMovies[]>(`${apiUrl}/movies`, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  // Making the api call for one movie
  getMovie(title: string): Observable<IMovies> {
    const token = localStorage.getItem("token");
    return this.http.get<IMovies>(`${apiUrl}/movies/${title}`, {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "movies/directors", {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  
  /*getGenre(Name: string, Description: string): Observable<IMovies> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "movies/genre", {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }*/
  getUser(): Observable<any> { //This route doesnt exist on your backend
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.get(apiUrl + "/users/" + username, {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }
  
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");
    return this.http.post(`${apiUrl}/users/${localStorageUser}/movies/${movieId}`,
      null,
      {headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })})
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.put(apiUrl + "/users/" + username, updatedUser, {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    return this.http.delete(apiUrl + "users/" + username, {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");
    return this.http.delete(`${apiUrl}/users/${localStorageUser}/movies/${movieId}`, {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /*isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieId) >= 0;
  }*/

  private extractResponseData<T>(res: T): T {
    return res;
  }

  private handleError() {
    return throwError(() => ({ message: "nothing"}))
  }
}
