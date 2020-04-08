import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/api/service/authentication.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
    private authorizationHeader: string;
    private authorizationValue: string;
    public error$ = new Subject<any>();

    basic(token: string) {
        this.authorizationHeader = 'authorization';
        this.authorizationValue = token;
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authorizationHeader) {
            // Send the authorization headers
            const headers = {};
            headers[this.authorizationHeader] = this.authorizationValue;
            req = req.clone({
                setHeaders: headers,
                withCredentials: true
            });
            // Clear the credentials after being sent
            this.clear();
        } else {
            // Send the session cookie credentials
            req = req.clone({
                withCredentials: true
            });
        }

        // Also handle errors globally
        return next.handle(req).pipe(
            tap(x => x, err => {
                // Handle this err
                // if(err.status != 404) {
                    // console.error(`Error performing request, status code = ${err.status}`);
                // }
                if (err) {
                    this.error$.next(err);
                }
            })
        );
    }

    clear() {
        this.authorizationHeader = null;
        this.authorizationValue = null;
    }
}