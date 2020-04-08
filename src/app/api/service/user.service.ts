import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { User } from 'src/app/api/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private rootUrl: string;
 
  constructor(
    private config: ApiConfiguration,
    private http: HttpClient
  ) { 
    //this.rootUrl = config.rootUrl + '/user'
   this.rootUrl = config.rootUrl + 'account' + config.apiVersion + 'accounts/'
   // this.rootUrl = 'ec2-52-221-120-194.ap-southeast-1.compute.amazonaws.com/user';
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authentication': localStorage.getItem('token')
    })
  }   

  listUsers(): Observable<Array<User>>  {
    return this.http.get<any>(this.rootUrl)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getUser(id: number): Observable<User> {
    console.log(this.httpOptions);
    return this.http.get<any>(this.rootUrl + '/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createUser(User: User): Observable<User> {
    return this.http.post<any>(this.rootUrl, JSON.stringify(User), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(id: number, User: User): Observable<User> {
    return this.http.put<any>(this.rootUrl + '/' + id, JSON.stringify(User), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<any>(this.rootUrl + '/' + id, this.httpOptions)
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
