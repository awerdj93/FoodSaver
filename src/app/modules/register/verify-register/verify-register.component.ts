import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/api/service/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FormState } from '../../shared/model/form-state.model';

@Component({
  selector: 'app-verify-register',
  templateUrl: './verify-register.component.html',
  styleUrls: ['./verify-register.component.css']
})
export class VerifyRegisterComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  @Input() email: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
  }


  onSubmit() {
   // this.authenticationService.login(this.form.controls.username.value, this.form.controls.password.value)
//     .subscribe(
//         data => {
//             console.log(data);
//             this.router.navigate(["/profile"]);
//         },
//         error => {
//             this.formState.serverErrors = error;
//             this.formState.loading = false;
//         });
 }

}
