import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { Subscriber } from 'src/app/api/models';

@Injectable({
providedIn: 'root'
})
export class SubscriberService {
private url: string;

constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) {
    this.url = config.rootUrl + 'notification' + config.apiVersion + 'subscribers';
    //this.url = 'http://localhost:8080/subscribers/users'
  }

  listSubscribers(): Observable<Array<any>>  {
    return this.http.get<any>(this.url)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getSubscriberByUser(id: number): Observable<any>  {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + '/users', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createSubscriber(subscriber: Subscriber, userId: number): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    console.log(subscriber);
    return this.http.post<any>(this.url + '/users', subscriber, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteSubscriber(id: number): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    console.log(id);
    return this.http.delete<any>(this.url + '/' + id, httpOptions)
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
