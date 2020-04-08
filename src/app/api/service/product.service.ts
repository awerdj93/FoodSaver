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
  private rootUrl: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
   this.rootUrl = config.rootUrl + 'product' + config.apiVersion + 'products'
   //this.rootUrl = "assets/products.json";
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authentication': localStorage.getItem('token')
    })
  }  

  listProducts(): Observable<Array<any>>  {
    console.log(this.rootUrl);
    return this.http.get<any>(this.rootUrl, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<any>(this.rootUrl + '/' + id)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDatangProduct;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<any>(this.rootUrl, JSON.stringify(product), this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataProduct;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<any>(this.rootUrl + '/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataProduct;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(this.rootUrl + '/' + id, this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataProduct;
      // }),
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
