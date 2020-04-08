import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { Router } from '@angular/router';
import { AuthenticationService, UserService} from 'src/app/api/services';
import { PasswordValidators } from '../../shared/validators/password-validators';
import { User } from 'src/app/api/models';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  error: string;
  email: string;
  created = false;
  currentUser: User;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService
  ) {
      // redirect to home if already logged in
    //   if (!this.authenticationService.currentUserValue) {
    //       this.router.navigate(['/']);
    //   }
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
      this.form = this.formBuilder.group({
          name: [this.currentUser.name, Validators.required],
          email: [this.currentUser.email, Validators.required],
          username: [this.currentUser.username, Validators.required],
      });
      this.formState = new FormState(this.form);
  }

  onSubmit() {
      if (this.formState.valid) {
          this.userService.updateUser(this.currentUser.id, {
              id: this.currentUser.id,
              name: this.form.controls.name.value,
              email: this.form.controls.email.value,
              username: this.form.controls.username.value,
              password: this.currentUser.password,
              registeredOn: this.currentUser.registeredOn,
              lastLoginDate: this.currentUser.lastLoginDate
          })
              .subscribe(
                  data => {
                      console.log(data);
                      this.created = true;
                      this.email = this.form.controls.email.value;
                      //this.alertService.success('Registration successful', true);
                      this.formState.loading = false;
                  },
                  error => {
                      this.formState.serverErrors = error;
                      this.formState.loading = false;
                  });
      }  
  }  
}
