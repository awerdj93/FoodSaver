import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Address, Product } from '../models';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private url: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.url = config.rootUrl + 'account' + config.apiVersion + 'addresses';
  }
  
  listAddress(): Observable<Array<Address>>  {
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

  addAddress(address: Address): Observable<Address> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.put<any>(this.url, JSON.stringify(address), httpOptions)
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
