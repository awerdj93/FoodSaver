import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from 'src/app/api/services';
import { Address, User} from 'src/app/api/models';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from '../../shared/service/modal.service';
import { AddressService } from 'src/app/api/service/address.service';
import axios from 'axios'
import { HttpHeaders } from '@angular/common/http';

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
      private authenticationService: AuthenticationService,
      private addressService: AddressService,
      private bsModalService: BsModalService,
      private modalService: ModalService
  ) {
    // redirect to home if already logged in
    //   if (!this.authenticationService.currentUserValue) {
    //       this.router.navigate(['/']);
    //   }
    this.currentUser = this.authenticationService.currentUserValue;
    this.refresh();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      block: ['', Validators.required],
      unitNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
  }

  refresh() {
    this.addressService.listAddress().subscribe(data => {
      this.addresses = data;
    });
  }

  // delete(id: number) {
  //   this.modalService.confirm('Confirm Delete', 'Are you sure you want to delete this address?', 'danger')
  //   .then(confirm => {
  //     console.log(confirm);
  //    // if (confirm) {
  //       this.addressService.deleteAddress(id).subscribe(data => {
  //         this.refresh();
  //       });
  //     //}
  //   })
  // }

  addAddress(content) {
    this.add = true;
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
  }

  close() {
    this.modalRef.hide();
  }

  onSubmit() {
    if (this.formState.valid) {
      const address = {
        id: null,
        name: this.form.controls.name.value,
        street: this.form.controls.street.value,
        block: this.form.controls.block.value,
        unitNumber: this.form.controls.unitNumber.value,
        postalCode: this.form.controls.postalCode.value,
        userId: this.currentUser.id
      }
      this.addressService.addAddress(address).subscribe(
        (data: Address) => {
          console.log(data);
          this.modalService.alert('Address added', `New address: ${address.name} has been successfully added.`, 'success');
          this.formState.loading = false;
          this.modalRef.hide();
          this.refresh();
        },
        error => {
          this.formState.serverErrors = error;
          this.formState.loading = false;
        });
    }
  }

  delete(id: number) {
    this.modalService.confirm('Confirm Delete', 'Are you sure you want to delete this address?', 'danger')
    .then(confirm => {
      if (confirm) {
        this.addressService.deleteAddress(id).subscribe(data => {
          this.modalService.alert('Address Deleted', 'Address successfully deleted', 'success')
          this.refresh();
        }
       );
      } else {
        
      }
    })
  }
}  
