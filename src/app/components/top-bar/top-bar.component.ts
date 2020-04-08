import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { User } from 'src/app/api/model/user';
import { AuthenticationService } from 'src/app/api/service/authentication.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.currentUser$ = this.authenticationService.currentUser; 
  }

  ngOnInit(): void {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);   
  }
}
