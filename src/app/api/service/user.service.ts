import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { User } from 'src/app/api/models';
import { ModalService } from 'src/app/modules/shared/service/modal.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
 
  constructor(
    private modalService: ModalService,
    private config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.url = config.rootUrl + 'account' + config.apiVersion + 'accounts'
    //this.url = 'http://localhost:8080/user';
  }

  createUser(user: User): Observable<User> {
    return this.http.post<any>(this.url, user)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  deleteUser(id: number): Observable<User> {
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

  getUser(id: number): Observable<User> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + '/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(id: number, user: User): Observable<User> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
      })
    };

    return this.http.put<any>(this.url + '/' + id, user, httpOptions)
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
    //this.modalService.alert('Error', errorMessage, 'danger');
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
