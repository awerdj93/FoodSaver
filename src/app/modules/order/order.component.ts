import { Component, OnInit } from '@angular/core';
import { User, Order } from 'src/app/api/models';
import { OrderService, AuthenticationService } from 'src/app/api/services';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  currentUser: User;
  params: Params;
  order: Order;
  yourOrder: boolean;

  constructor(private orderService: OrderService, 
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => this.params = params);
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.orderService.getOrder(this.params.id).subscribe(data => {
      this.order = data;
      console.log(data);
      if (this.order.userId === this.currentUser.id) {
        this.yourOrder = true;
      }
    });
  }

}
