import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, filter, map } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { User, Message } from 'src/app/api/models';
import { ModalService } from 'src/app/modules/shared/service/modal.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url: string;
 
  constructor(
    private modalService: ModalService,
    private config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.url = config.rootUrl + 'chat' + config.apiVersion + 'messages'
    //this.url = 'http://localhost:8080/users/2/messages';
  }

  createMessage(message: Message): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': token
      })
    };
    return this.http.post<any>(this.url, message, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  deleteMessage(id: number): Observable<any> {
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

  getAllMessages(): Observable<any> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + '/', httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getMessage(id: number): Observable<any> {
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

  updateMessage(id: number, message: Message): Observable<Message> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token,
      })
    };

    return this.http.put<any>(this.url + '/' + id, message, httpOptions)
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
