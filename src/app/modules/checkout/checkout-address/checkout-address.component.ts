import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';
import { User, Address } from 'src/app/api/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthenticationService, AddressService } from 'src/app/api/services';
import { ModalService } from '../../shared/service/modal.service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css']
})
export class CheckoutAddressComponent implements OnInit {
  @Input() deliveryAddress: Address;
  @Input() billingAddress: Address;
  form: FormGroup;
  formState: FormState;
  error: string;
  currentUser: User;
  addresses: Array<Address>;
  modalRef: BsModalRef;
  index: number;
  shipping: boolean;

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

  onRadioSelect(i: number) {
    this.index = i;
  }

  onSelectAddress(content, shipping) {
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
    this.shipping = shipping;
  }

  close() {
    this.modalRef.hide();
  }

  copyAddress() {
    this.billingAddress = new Address();
    this.billingAddress.id = this.deliveryAddress.id;
    this.billingAddress.name = this.deliveryAddress.name;
    this.billingAddress.street = this.deliveryAddress.street;
    this.billingAddress.block = this.deliveryAddress.block;
    this.billingAddress.unitNumber = this.deliveryAddress.unitNumber;
    this.billingAddress.postalCode = this.deliveryAddress.postalCode;
    this.billingAddress.userId = this.deliveryAddress.userId;
  }

  selectAddress() {
    let address = this.addresses[this.index];
    if (this.shipping) {
      this.deliveryAddress = address;
    } else {
      this.billingAddress = address;
    }
    this.modalRef.hide();
  }

  onNewAddress(content, shipping) {
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
    this.shipping = shipping;
  }


  onSubmit() {
    if (this.formState.valid) {
      let address = new Address();
      address.name = this.form.controls.name.value;
      address.street = this.form.controls.street.value;
      address.block = this.form.controls.block.value;
      address.unitNumber = this.form.controls.unitNumber.value;
      address.postalCode = this.form.controls.postalCode.value;
      address.userId = this.currentUser.id;

      this.addressService.addAddress(address).subscribe(data => {
        if (this.shipping) {
          this.deliveryAddress = address;
        } else {
          this.billingAddress = address;
        }
        this.modalRef.hide();
      });
      
    }
  }
}
