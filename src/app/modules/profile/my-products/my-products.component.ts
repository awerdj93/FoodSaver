import { Component, OnInit } from '@angular/core';
import { ProductService, AuthenticationService, OrderService } from 'src/app/api/services';
import { PageState } from '../../shared/model/page-state.model';
import { Product, User } from 'src/app/api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  public products: Array<Product>;
  public pageState: PageState = new PageState();
  private currentUser: User;

  constructor(private router: Router,
      private productService: ProductService, 
      private authenticationService: AuthenticationService) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.productService.listProducts().subscribe(data => {
      console.log(data);
      this.products = data;
      if (this.products) {
        this.pageState.collectionSize = data.length;
      } else {
        this.pageState.collectionSize = 0;
      }
    });
  }

  viewProduct(id: number) {
    this.router.navigateByUrl('profile/products/'+ id);
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
