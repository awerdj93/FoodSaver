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
    this.url = config.rootUrl + 'notification' + config.apiVersion
  }

  listSubscribers(): Observable<Array<any>>  {
    return this.http.get<any>(this.url + 'users/')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createSubscriber(subscriber: Subscriber): Observable<Subscriber> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
          'Accept': '*/*'
      })
    };
    return this.http.post<any>(this.url+ 'subscribers/users/', subscriber, httpOptions)
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
