import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, SubscriberService } from 'src/app/api/services';
import { FormState } from '../shared/model/form-state.model';
import { PasswordValidators } from '../shared/validators/password-validators';
import { User, Subscriber } from 'src/app/api/models';
import { ModalService } from '../shared/service/modal.service';

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
    currentUser: User;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private subscriberService: SubscriberService,
        private modalService: ModalService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        // redirect to home if already logged in
        if (this.currentUser) {
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
                    (data: number) => {
                      
                        // this.created = true;
                        // this.email = this.form.controls.email.value;
                        this.modalService.alert("Success", 'You are subscribed to our mailing list', 'success');
                        this.formState.loading = false;
                    },
                    error => {
                        this.formState.serverErrors = error;
                        this.formState.loading = false;
                    });
        }
    }  
}
