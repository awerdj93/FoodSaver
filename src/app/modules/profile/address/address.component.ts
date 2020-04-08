import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'src/app/api/services';
import { Address, User} from 'src/app/api/models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../shared/service/modal.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  error: string;
  currentUser: User;
  addresses: Array<Address>;
  address: Address;
  modalRef: BsModalRef;
  add: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private bsModalService: BsModalService,
      private modalService: ModalService
  ) {
      // redirect to home if already logged in
    //   if (!this.authenticationService.currentUserValue) {
    //       this.router.navigate(['/']);
    //   }
    
    this.currentUser = this.authenticationService.currentUserValue;
    this.addresses = [{
      street: 'Jurong',
          block: '123',
          unitNo: '#3-23',
          country: 'singapore',
          postalCode: 123456
    },
    {
      street: 'Bishan',
          block: '123',
          unitNo: '#3-23',
          country: 'singapore',
          postalCode: 123433
    }]; //= this.currentUser.addresses;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      street: ['', Validators.required],
      block: ['', Validators.required],
      unitNo: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
  }

  update() {
    
  }

  delete(i: number) {
    this.modalService.confirm('Confirm Delete', 'Are you sure you want to delete this address?', 'danger')
    .then(confirm => {
      this.addresses.splice(i, 1);
    })
  }

  addAddress(content) {
    this.add = true;
    this.form = this.formBuilder.group({
      street: ['', Validators.required],
      block: ['', Validators.required],
      unitNo: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });

  }

  editAddress(content, i: number) {
    this.add = false;
    let address = this.addresses[i];
    this.form = this.formBuilder.group({
      street: [address.street, Validators.required],
      block: [address.block, Validators.required],
      unitNo: [address.unitNo, Validators.required],
      country: [address.country, Validators.required],
      postalCode: [address.postalCode, Validators.required],
    });
    this.formState = new FormState(this.form);
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
    // this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    //   this.closeResult = `Closed with: ${result}`;
    // }, (reason) => {
    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    // });

  }

  close() {
    this.modalRef.hide();
  }

  onSubmit() {
      if (this.formState.valid) {

        let addr = {
          id: this.addresses ? this.address.id : null,
          street: this.form.controls.street.value,
              block: this.form.controls.block.value,
              unitNo: this.form.controls.unitNo.value,
              country: this.form.controls.country.value,
              postalCode: this.form.controls.postalCode.value
        };
          // this.userService.updateAddress(this.currentUser.id, {
          //     id: this.currentUser.id,
          //     street: this.form.controls.street.value,
          //     block: this.form.controls.block.value,
          //     unitNo: this.form.controls.unitNo.value,
          //     country: this.form.controls.country.value,
          //     postalCode: this.form.controls.postalCode.value
          // })
          //     .subscribe(
          //         data => {
          //             console.log(data);
          //             //this.alertService.success('Registration successful', true);
          //             this.formState.loading = false;
          //         },
          //         error => {
          //             this.formState.serverErrors = error;
          //             this.formState.loading = false;
          //         });
      }  
    }
}  