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
    this.url = config.rootUrl + 'product' + config.apiVersion
  }

  listProducts(): Observable<Array<any>>  {
    return this.http.get<any>(this.url + 'products')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  listProductsByUser(): Observable<Array<any>>  {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    return this.http.get<any>(this.url + 'sellers/products', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createProduct(product: Product){
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    return this.http.post<any>(this.url+ 'products', product, httpOptions)
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
    return this.http.delete<any>(this.url + 'products/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<any>(this.url + 'products/' + id)
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
      })
    };
    return this.http.put<any>(this.url + 'products/' + product.id, product, httpOptions)
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
