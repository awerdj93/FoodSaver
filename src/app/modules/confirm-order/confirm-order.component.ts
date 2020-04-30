import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/api/models';
import { OrderService } from 'src/app/api/services';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {
  order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
   // this.orderService.
  }

}
