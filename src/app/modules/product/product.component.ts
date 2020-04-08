import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models';
import { ProductService } from 'src/app/api/services';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private params: Params;
  product: Product;
 
  constructor(private productService: ProductService,
    private route: ActivatedRoute) { 
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.product = {
      name: 'name',
      price: 5,
      type: 'Raw',
      description: 'This is a product'
    };
    this.productService.getProduct(3)
    .subscribe(data => {
      this.product = data;
    });
    
  }

 
}
