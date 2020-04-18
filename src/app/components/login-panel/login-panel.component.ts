import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/api/service/authentication.service';
import { FormState } from 'src/app/modules/shared/model/form-state.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {
  @Input() returnUrl: string;
  form: FormGroup;
  formState: FormState;
  error: string;
  rmbMe: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      email: [localStorage.getItem('email'), Validators.required],
      password: [localStorage.getItem('password'), Validators.required],
      remember: [localStorage.getItem('remember')]
    });
    this.formState = new FormState(this.form);
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.error = null;
    if (this.formState.valid) {
      this.authenticationService.token(this.form.controls.email.value, this.form.controls.password.value)
        .subscribe(
          token => {
            if (this.form.controls.remember.value) {
              localStorage.setItem('email', this.form.controls.email.value);
              localStorage.setItem('password', this.form.controls.password.value); 
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('password'); 
            }
            localStorage.setItem('remember', this.form.controls.remember.value);   
            this.authenticationService.login(token.authorization).subscribe(
              user => {
                this.router.navigate(['/profile']);
              },
              (error: HttpErrorResponse) => {
                this.error = 'Unable to retrieve user';
                this.formState.loading = false;
              }
            )
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.error = error.message;
            this.formState.loading = false;
          }
        );
    }
  }
}
