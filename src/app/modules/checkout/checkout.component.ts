import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CartService, OrderService } from 'src/app/api/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { User, Cart, Order, Item, Address } from 'src/app/api/models';
import { ModalService } from '../shared/service/modal.service';

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

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService,
    private modalService: ModalService) { 
      this.order = new Order();
      this.user = this.authenticationService.currentUserValue;
      this.order.userId = this.user.id;
  }

  ngOnInit(): void {
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

  onSubmit() {
    this.order.billingAddress = this.billingAddress;
    this.order.deliveryAddress = this.deliveryAddress;
    this.orderService.createOrder(this.order).subscribe(data => {
      
      this.modalService.alert("Success", 'Order made', 'success');
    });
  }
}
