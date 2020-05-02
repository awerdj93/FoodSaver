import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { Review } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url: string;

  constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) {
    this.url = config.rootUrl + 'review' + config.apiVersion;
  }

  getReview(id: number): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + 'sellers/'+id+'/reviews', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getAvgRating(id: number): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + 'sellers/'+id+'/avg-rating/', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createReview(review: Review,id: number): Observable<Review> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.post<any>(this.url + '/sellers/'+id+'reviews/', review, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateReview(id: number, review: Review): Observable<Review> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.put<any>(this.url + 'reviews/' + id, review, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteReview(id: number): Observable<Review> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.delete<any>(this.url +  + 'reviews/' + id, httpOptions)
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
