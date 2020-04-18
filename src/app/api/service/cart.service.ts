import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User, Product, Cart } from '../models';
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
  
  listCart(): Observable<Cart>  {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<any>(this.url + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addProductToCart(id: number) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
    console.log(token);
    console.log(id);
    console.log(this.url + '/products/' + id);
    return this.http.put<any>(this.url + '/products/' + id, {}, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteProductFromCart(id: number) {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
    return this.http.delete<any>(this.url + '/products/' + id, httpOptions)
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
    console.log(error);
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
