import { Component, OnInit } from '@angular/core';
import { AuthenticationService, OrderService } from 'src/app/api/services';
import { Order, User, Address, Item } from 'src/app/api/models';
import { PageState } from '../../shared/model/page-state.model';
import { Router } from '@angular/router';
import { strict } from 'assert';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  public orders: Array<Order>;
  public pageState: PageState = new PageState();
  private currentUser: User;
  panelOpenState = false;

  constructor(private orderService: OrderService, 
    private router: Router,
    private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.orderService.listOrders(this.currentUser).subscribe((data: Array<Order>) => {
      console.log(data);
      this.orders = data;
      this.pageState.collectionSize = data.length;
    });
  }

  review(id: number){
    this.router.navigateByUrl('/review/' + id);
  }

  itemValue (item: Item) {
    if (item) {
      return item.name + ' - $' + item.price ;
    }
    return '';
  }

  addressValue(address: Address): string {
    if (address) {
      return address.block + ' ' + address.street + ' ' + address.unitNumber + ', Singapore ' + address.postalCode;
    }
    return '';
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
