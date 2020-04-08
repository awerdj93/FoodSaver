import { Component, OnInit } from '@angular/core';
import { AuthenticationService, OrderService } from 'src/app/api/services';
import { Order, User } from 'src/app/api/models';
import { PageState } from '../../shared/model/page-state.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: Array<Order>;
  public pageState: PageState = new PageState();
  private currentUser: User;

  constructor(private orderService: OrderService, 
    private router: Router,
    private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.orderService.listOrders(this.currentUser).subscribe(data => {
      console.log(data);
      this.orders = data;
      this.pageState.collectionSize = data.length;
    });
  }

  review(id: number){
    this.router.navigateByUrl('/review/' + id);
  }

  onPage(event: number) {
    this.pageState.page = event;
    this.refresh();
  }

  onPageSize(event: number) {
    this.pageState.pageSize = event;
    this.refresh();
  }
}
