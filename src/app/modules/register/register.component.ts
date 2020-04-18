import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'src/app/api/services';
import { FormState } from '../shared/model/form-state.model';
import { PasswordValidators } from '../shared/validators/password-validators';
import { User } from 'src/app/api/models';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    formState: FormState;
    error: string;
    email: string;
    created = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, Validators.required],
            email: [null, Validators.required],
            password: [null, [Validators.required, Validators.minLength(8)]],
            confirmPassword: [null, [Validators.required]]
        },
        {
           // check whether our password and confirm password match
           validator: PasswordValidators.match
        })
        this.formState = new FormState(this.form);
    }

    onSubmit() {
        console.log(this.formState);
        if (this.formState.valid) {    
            let user = new User();
            user.name = this.form.controls.name.value,
            user.email = this.form.controls.email.value,
            user.password = this.form.controls.password.value
            this.userService.createUser(user)
                .pipe(first())
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
