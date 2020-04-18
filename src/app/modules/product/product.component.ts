import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models';
import { ProductService, CartService } from 'src/app/api/services';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ModalService } from '../shared/service/modal.service';
import axios from 'axios'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private params: Params;
  product: Product;
  error: string;
 
  constructor(private productService: ProductService,
    private cartService: CartService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.productService.getProduct(this.params.id)
    .subscribe((data: Product) => {
      this.product = data;
    });
  }

  addToCart() {
    this.cartService.addProductToCart(this.product.id)
    .subscribe(data => {
        this.modalService.confirm("Product Added", `${this.product.name} has been added to cart. Proceed to cart?`, 'success')
        .then(confirm => {
          if (confirm) {
            this.router.navigate(['/cart']);
          } else {
            this.router.navigate(['/catalog']);
          }
        });
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  back() {
    this.router.navigate(['/catalog']);
  }
}
