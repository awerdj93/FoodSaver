import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private rootUrl: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.rootUrl = config.rootUrl + 'product'+ config.apiVersion + 'carts';
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }  
  
  listCart(): Observable<Array<User>>  {
    return this.http.get<any>(this.rootUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCart(id: number): Observable<User> {
    return this.http.get<any>(this.rootUrl + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // createUser(User: User): Observable<User> {
  //   return this.http.post<any>(this.rootUrl + '/', JSON.stringify(User), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // updateUser(id: number, User: User): Observable<User> {
  //   return this.http.put<any>(this.rootUrl + '/' + id, JSON.stringify(User), this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // deleteUser(id: number): Observable<User> {
  //   return this.http.delete<any>(this.rootUrl + '/' + id, this.httpOptions)
  //   .pipe(
  //     retry(1),
  //     catchError(this.handleError)
  //   )
  // }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
