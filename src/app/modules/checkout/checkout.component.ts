import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CartService, OrderService } from 'src/app/api/services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { User, Cart, Order, Item } from 'src/app/api/models';

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

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService) { 
      this.order = new Order();
      this.user = this.authenticationService.currentUserValue;
      this.order.userId = this.user.id;
  }

  ngOnInit(): void {
    this.cartService.listCart().subscribe(data => {
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
    this.orderService.createOrder(this.order);
  }
}
