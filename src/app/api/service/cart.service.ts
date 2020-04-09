import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, Product } from '../models';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.url = config.rootUrl + 'product'+ config.apiVersion + 'carts';
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }  
  
  listCart(): Observable<Array<any>>  {
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authentication': localStorage.getItem('token') ? localStorage.getItem('token') : ''
        })
      }

    return this.http.get<any>(this.url, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCart(id: number): Observable<User> {
    return this.http.get<any>(this.url + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addProductToCart(product: Product): Observable<Product> {
    return this.http.put<any>(this.url + '/products', JSON.stringify(product), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteProductFromCart(id: number): Observable<User> {
    return this.http.delete<any>(this.url + '/products/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

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
