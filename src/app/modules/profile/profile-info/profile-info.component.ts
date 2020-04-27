import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { User } from 'src/app/api/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, UserService, ReviewService } from 'src/app/api/services';
import { ModalService } from '../../shared/service/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  currentUser: User;
  error: string;
  modalRef: BsModalRef;
  userRating: number;
  
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private modalService: ModalService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formState = new FormState(this.form);
    this.reviewService.getAvgRating(this.currentUser.id).subscribe((rating: number) => {
      this.userRating = rating;
    });
  }

  onSubmit() {
    if (this.formState.valid) {

        // this.userService.updateUser(this.currentUser.id, {
        //   id: this.currentUser.id,
        //   name: this.currentUser.name,
        //   username: this.currentUser.username,
        //   email: this.currentUser.email,
        //   password: this.form.controls.password.value,
        //   registeredOn: this.currentUser.registeredOn,
        //   lastLoginDate: this.currentUser.lastLoginDate
        // }).subscribe(
        //   data => {
        //     this.modalService.alert('Password changed', 'Password successfully changed', 'success')
        //     .then(() => this.router.navigateByUrl['/profile']);
        //   },
        //   (error: HttpErrorResponse) => {
        //     this.error = error.message;
        //     this.formState.loading = false;
        //   }
        // );
      
    }
  }

  close() {
    this.modalRef.hide();
  }

}
