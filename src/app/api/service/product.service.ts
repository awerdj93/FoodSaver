import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { Product } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
   this.url = config.rootUrl + 'product' + config.apiVersion + 'products'
   //this.rootUrl = "assets/products.json";
  }

  listProducts(): Observable<Array<any>>  {
    return this.http.get<any>(this.url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createProduct(product: Product): Observable<Product> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    return this.http.post<any>(this.url, product, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: number): Observable<Product> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.delete<any>(this.url + '/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<any>(this.url + '/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateProduct(product: Product): Observable<Product> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    return this.http.put<any>(this.url + '/' + product.id, product, httpOptions)
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
