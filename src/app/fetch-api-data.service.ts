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

  // Making the api call for all movies endpoint
  /**
   * Gets all the movies from the api
   * @returns  
   */
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
  /**
   * gets a pacific movie by title
   * @param title 
   * @returns 
   */
  getMovie(title: string): Observable<IMovies> {
    const token = localStorage.getItem("token");
    return this.http.get<IMovies>(`${apiUrl}/movies/${title}`, {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * gets a director by name. users can view info about the director
   * @param directorName 
   * @returns 
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "movies/directors", {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Gets info about the genre of the movie. Name of the genre and a Description of the genre
   * @param Name 
   * @param Description 
   * @returns 
   */
  getGenre(Name: string, Description: string): Observable<IMovies> {
    const token = localStorage.getItem("token");
    return this.http.get<IMovies>(`${apiUrl}/movies/genre/`, {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  getUser(): Observable<any> { //This route doesnt exist on your backend
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/users", {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(
      map(this.extractResponseData), catchError(this.handleError));
  }

  // getFavoriteMovies(): Observable<any> {
  //   const token = localStorage.getItem("token");
  //   return this.http.get(apiUrl + "users/username", {headers: new HttpHeaders({
  //     Authorization: "Bearer " + token,
  //   })}).pipe(
  //     map(this.extractResponseData),
  //     map((data) => data.FavoriteMovies),
  //     catchError(this.handleError));
  // }
  //

  /**
   * Adds movie to user's favorite movies list
   * @param movieId 
   * @returns 
   */
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

  /**
   * allows users to edit their profiles
   * @param updatedUser 
   * @returns 
   */
  editUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.put(apiUrl + "users/username", updatedUser, {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * deletes user profile
   * @returns 
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http.delete(apiUrl + "users/username", {headers: new HttpHeaders({
        Authorization: "Bearer " + token,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * removes a movie that is in a user's  favorite movie list
   * @param movieId 
   * @returns 
   */
  removeFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem("token");
    const localStorageUser = localStorage.getItem("user");
    return this.http.delete(`${apiUrl}/users/${localStorageUser}/movies/${movieId}`, {headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      })}).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData<T>(res: T): T {
    return res;
  }

  private handleError() {
    return throwError(() => ({ message: "nothing"}))
  }
}
