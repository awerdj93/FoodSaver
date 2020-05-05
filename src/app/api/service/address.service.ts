import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Address, Product } from '../models';
import { retry, catchError, filter, map, tap } from 'rxjs/operators';
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
    return this.http.post<any>(this.url, address, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteAddress(id: number): Observable<Address> {
    let token = localStorage.getItem('token');

    // let req = new HttpRequest<any>(
    //   'DELETE',
    //   this.url + '/' + id,
    //   null,
    //   {
    //     headers: new HttpHeaders({
    //       'authorization': token,
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Credentials': 'true',
    //       'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    //     }),

    //     responseType: 'json'
    //   });
    //   return this.http.request<any>(req).pipe(
    //     filter(_r => _r instanceof HttpResponse)
    //   );
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token,
      }),
    };
    return this.http.delete<any>(this.url + '/' + id, httpOptions)
    .pipe(
     // tap(console.log),
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error) {
    console.log(error);
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else if (error.status !== 200) {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
