import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models';
import { ProductService, CartService } from 'src/app/api/services';
import { Router, Params, ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.productService.getProduct(this.params.id)
    .subscribe(data => {
      this.product = data;
    });
    
  }

  addToCart() {
    this.cartService.addProductToCart({});
  }
}
