import { Component, OnInit } from '@angular/core';
import { FormState } from '../../shared/model/form-state.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/api/models';
import { AuthenticationService, UserService } from 'src/app/api/services';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ModalService } from '../../shared/service/modal.service';
import { PasswordValidators } from '../../shared/validators/password-validators';
import axios from 'axios';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  currentUser: User;
  error: string;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.form = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]]
    },
    {
      // check whether our password and confirm password match
      validator: PasswordValidators.match
    });
    this.formState = new FormState(this.form);
  }

  onSubmit() {
    this.error = null;
    if (this.formState.valid) {
      if (this.currentUser.password !== this.form.controls.oldPassword.value) {
        this.error = 'Old password not match' ;
      } else {
        let user = new User();
        user.id = this.currentUser.id;
        user.name = this.currentUser.name;
        user.email = this.currentUser.email;
        user.password = this.form.controls.password.value;
        user.createdAt = this.currentUser.createdAt;
        user.updatedAt = this.currentUser.updatedAt;

        console.log(user);
        this.userService.updateUser(this.currentUser.id, user).subscribe(
          data => {
            this.currentUser.password = user.password;
            this.modalService.alert('Password changed', 'Password successfully changed', 'success')
            .then(() => {
              this.authenticationService.refresh();
              this.router.navigateByUrl['/profile'];
            });
          },
          (error: HttpErrorResponse) => {
            this.error = error.message;
            this.formState.loading = false;
          }
        );
         //let token = localStorage.getItem('token');
        // const httpOptions = {
        //   headers: new HttpHeaders({
        //       'authorization': token,
        //   })
        // };
    
        // axios.put('https://h1oszwe4ta.execute-api.ap-southeast-1.amazonaws.com/stag/account/api/v1/accounts/' + this.currentUser.id
        // , user, {
        //   headers: {
        //     authorization: token,
        //   },
        // })
        // .then((response) => {
        //   this.modalService.alert('Password changed', 'Password successfully changed', 'success')
        //    .then(() => this.router.navigateByUrl['/profile']);
        //   console.log(response);
        // }, (error) => {
        //   console.log(error);
        // });
      }
      
    }
  }
}
