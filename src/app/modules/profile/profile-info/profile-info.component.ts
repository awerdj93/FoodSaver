import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { User } from 'src/app/api/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, AddressService, ReviewService, SubscriberService } from 'src/app/api/services';
import { ModalService } from '../../shared/service/modal.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscriber, Address } from 'src/app/api/models';

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
  subscriber: Subscriber;
  subscribed: boolean;
  addresses: Array<Address>;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private authenticationService: AuthenticationService,
    private subscriberService: SubscriberService,
    private addressService: AddressService,
    private modalService: ModalService) { 
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.subscribed = false;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formState = new FormState(this.form);
    this.reviewService.getAvgRating(this.currentUser.id).subscribe((rating: number) => {
      this.userRating = rating;
    });
    this.addressService.listAddress().subscribe((data: Address[]) => {
      this.addresses = data;
    });
    this.subscriberService.getSubscriberByUser(this.currentUser.id).subscribe((sub: Subscriber) => {
      if (sub) {
        this.subscriber = sub;
        this.subscribed = true;
        console.log(sub);
      }
    });
  }

  setSubscription() {
    console.log(this.subscribed);
    if (this.subscribed) {
      this.onUnsubscribe();
    } else {
      this.onSubscribe();
    }
  }

  onSubscribe() {
    if (this.addresses && this.addresses.length > 0) {
      let subscriber = new Subscriber();
      subscriber.user_email = this.currentUser.email;
      subscriber.user_name = this.currentUser.name;
      subscriber.userId = this.currentUser.id;
      subscriber.user_addr = this.addresses[0].postalCode;
      console.log(subscriber);
      this.subscriberService.createSubscriber(subscriber, subscriber.userId).subscribe(sub => {
          subscriber.id = sub;
          this.subscriber = subscriber;
          this.subscribed = false;
      });
    } else {
      this.modalService.alert('Error', 'Please add an address to subscribe', 'danger');
    }
  }

  onUnsubscribe() {
    this.subscriberService.deleteSubscriber(this.subscriber[0].id).subscribe(sub => {
      this.subscriber = null;
      this.subscribed = true;
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
