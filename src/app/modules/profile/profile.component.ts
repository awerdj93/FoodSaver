import { Component, OnInit } from '@angular/core';
import { Address, User } from 'src/app/api/models';
import { AuthenticationService } from 'src/app/api/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public address: Address;
  loading: boolean;

  constructor(private authenticationService: AuthenticationService) { 
    this.user = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    
  }

}
