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
    this.subscriberService.listSubscribers().subscribe(subscriberList=>{
    if(subscriberList.some(x=>x.userId==this.currentUser['id'])){
      this.modalService.alert("Already subscribed!", 'You are already subscribed', 'No further Action required!');
    }
    else{
      if (this.formState.valid) {
      let subscriber = new Subscriber();
      this.addressService.listAddress().subscribe(data=>{
        if (data[0]==null){
        this.router.navigate(['/profile/address']);
        this.modalService.alert("Provide address!", 'Provide address below', 'please provide address below!');
        }
        else{
              let address:string = data[0]['street']+', '+data[0]['block']
              subscriber.user_addr = address+ ', Singapore',
              subscriber.user_email = this.currentUser['email'],
              subscriber.user_name = this.currentUser['name'],
              subscriber.userId = this.currentUser['id'],
              this.subscriberService.createSubscriber(subscriber).subscribe(
            data => {this.modalService.alert("Success", 'You are subscribed to our mailing list', 'success')
            });
        }
      });
    }
    }
    })
  }

  onUnsubscribe(){

        this.subscriberService.listSubscribers().subscribe(subscriberList=>{
      const user = subscriberList.find(element => element.userId = this.currentUser['id']);
if(user==null){
        this.modalService.alert("You are not subscribed!", 'You are not subscribed to our mailing list', 'success')
      }
      else{
        this.modalService.alert("Unsubscribe!", 'Are you sure, you want to unsubscribe our service?', 'Alert!').then(confirm=>{if(confirm)
          this.subscriberService.unsubscribe(user.id).subscribe(data=>{
          this.modalService.alert("Success", 'You are Unsubscribed from our mailing list', 'success')
        })
        })
      }
    })
  }


}
