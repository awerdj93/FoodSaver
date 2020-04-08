import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Order, User } from '../models';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from '../api-configuration';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private rootUrl: string;
 
  constructor(
    config: ApiConfiguration,
    private http: HttpClient
  ) { 
    //this.rootUrl = config.rootUrl
    this.rootUrl = "assets/orders.json";
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  listOrders(currentUser: User): Observable<Order[]>  {
    return this.http.get<any>(this.rootUrl)// + '/customers/' + currentUser.id + '/orders')
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataPageListOrder;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<any>(this.rootUrl + '/' + id)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataOrder;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  createOrder(order: Order, currentUser: User): Observable<Order> {
    return this.http.post<any>(this.rootUrl + '/customers/' + currentUser + '/orders',
     JSON.stringify(order), this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataOrder;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(this.rootUrl + '/' + id, JSON.stringify(order), this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataOrder;
      // }),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteOrder(id: number): Observable<Order> {
    return this.http.delete<Order>(this.rootUrl + '/' + id, this.httpOptions)
    .pipe(
      // filter(_r => _r instanceof HttpResponse),
      // map((_r) => {
      //   return _r as ApiDataOrder;
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
