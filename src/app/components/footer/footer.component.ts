import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
//import { ModalService } from 'src/app/modules/shared/service/modal.service';
import {AuthenticationService, AddressService } from 'src/app/api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/modules/shared/model/form-state.model';
import { SubscriberService } from 'src/app/api/services';
import { ModalService } from 'src/app/modules/shared/service/modal.service';
import { Subscriber } from 'src/app/api/models';
import { User, Address } from 'src/app/api/models'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentUser: User;
  currentAddress: Address;
  form: FormGroup;
  formState: FormState;

  constructor(private formBuilder: FormBuilder,
    private subscriberService: SubscriberService,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      user_email: [this.currentUser['email'], Validators.required]
    });
    this.formState = new FormState(this.form);
  }

  onSubscribe() {

    if (this.formState.valid) {
      let subscriber = new Subscriber();
      this.addressService.listAddress().subscribe(data=>{
      let address:string = data[0]['street']+', '+data[0]['block']
      if (address==''){
      this.router.navigate(['/profile/address']);
      this.modalService.alert("Provide address!", 'Provide address below', 'provide address below please');
      }
      else{
            subscriber.user_addr = address+ ', Singapore',
            //console.log(subscriber.user_addr);
            subscriber.user_email = this.currentUser['email'],
            subscriber.user_name = this.currentUser['name'],
            console.log(this.currentUser['name'],);
            subscriber.userId = this.currentUser['id'],
            this.subscriberService.createSubscriber(subscriber).subscribe(
          data => {this.modalService.alert("Success", 'You are subscribed to our mailing list', 'success')
          });
      }
      });
    }
  }
}
