import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiConfiguration } from 'src/app/api/api-configuration';
import { ModalService } from 'src/app/modules/shared/service/modal.service';
import { Chat } from '../model/chat';
import { AuthenticationService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url: string;
 
  constructor(
    private modalService: ModalService,
    private config: ApiConfiguration,
    private http: HttpClient
  ) { 
    this.url = config.rootUrl + 'chat' + config.apiVersion + 'chats';
    //this.url = 'http://chat-env.ap-southeast-1.elasticbeanstalk.com/users/' + currentUser.id + '/chats';
    //this.url = 'http://localhost:8080/users/' + currentUser.id + '/chats';
  }

  createChat(chat: Chat): Observable<Chat> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.post<any>(this.url, chat, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getChatByRecipient(id: number): Observable<Chat> {
    let token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
          'authorization': token
      })
    };
    return this.http.get<any>(this.url + '/recipient/' + id, httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  getChat(): Observable<any> {
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
