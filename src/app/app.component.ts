import { Component } from '@angular/core';
import { User } from './api/model/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './api/service/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FoodSaver';
  currentUser$: Observable<User>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.currentUser$ = this.authenticationService.currentUser;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
