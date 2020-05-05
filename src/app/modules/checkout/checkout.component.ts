import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService, CartService, OrderService, AddressService } from 'src/app/api/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { User, Cart, Order, Item, Address } from 'src/app/api/models';
import { ModalService } from '../shared/service/modal.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  error: string;
  user: User;
  order: Order;
  flatRate = 3;
  deliveryAddress: Address;
  billingAddress: Address;
  currentUser: User;
  addresses: Array<Address>;
  modalRef: BsModalRef;
  index: number;
  shipping: boolean;
  copyBtn: boolean;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService,
    private modalService: ModalService,
    private addressService: AddressService,
    private bsModalService: BsModalService,
    private router: Router
    ) { 
      this.order = new Order();
      this.user = this.authenticationService.currentUserValue;
      this.order.userId = this.user.id;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      block: ['', Validators.required],
      unitNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
    this.refreshAddress();

    this.cartService.listCart().subscribe((data: Cart) => {
      if (data.products) {
        let items = new Array<Item>();
        let subTotal = 0;
        data.products.forEach(product => {
          items.push(new Item(product));
          subTotal = subTotal + product.price;
        });
        this.order.items = items;
        this.order.subTotalPrice = subTotal;
        this.order.totalPrice = subTotal + this.flatRate;
      }
    }) 
  }

  onSubmitOrder() {
    this.order.billingAddress = this.billingAddress;
    this.order.deliveryAddress = this.deliveryAddress;
    console.log(this.billingAddress);
    console.log(this.deliveryAddress);
    console.log(this.order);
    this.orderService.createOrder(this.order).subscribe(data => {
      this.router.navigateByUrl('/order/' + data.id);
    });
  }

  refreshAddress() {
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

  onAddAddress(content) {
    this.form = this.formBuilder.group({
      street: ['', Validators.required],
      block: ['', Validators.required],
      unitNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
    this.formState = new FormState(this.form);
    this.modalRef.hide();
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
  }

  close() {
    this.modalRef.hide();
  }

  back(content) {
    this.modalRef.hide();
    this.modalRef = this.bsModalService.show(content, { ignoreBackdropClick: true, keyboard: false });
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

  onSubmit() {
    if (this.formState.valid) {
      let address = new Address();
      address.name = '';
      address.street = this.form.controls.street.value;
      address.block = this.form.controls.block.value;
      address.unitNumber = this.form.controls.unitNumber.value;
      address.postalCode = this.form.controls.postalCode.value;
      
      if (this.shipping) {
        this.deliveryAddress = address;
      } else {
        this.billingAddress = address;
      }
      this.modalRef.hide();
      
    }
    
  }

}
