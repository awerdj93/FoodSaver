import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models';
import { ApiConfiguration } from '../api-configuration';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private rootUrl: string;

    constructor(
        private config: ApiConfiguration,
        private http: HttpClient,
        private router: Router) 
    {
        //this.rootUrl = config.rootUrl;
        
        this.rootUrl = config.rootUrl + 'account' + config.apiVersion; 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    token(username: string, password: string) {
        let formData = new FormData();
        formData.append('email', username);
        formData.append('password', password);
        return this.http.post<any>(this.rootUrl +'login', formData);
    }

    login(token: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'authorization': token
            })
        };
        return this.http.get<any>(this.rootUrl +'profile', httpOptions).pipe(
            map(user => {
                console.log(user);

                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('token', token);
                this.currentUserSubject.next(user);
                //this.router.navigate(['/profile']);
                return user;
            })
        );
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}
