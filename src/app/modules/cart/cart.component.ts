import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/api/models';
import { ProductService } from 'src/app/api/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  productData: Array<Product>;
  products: Array<Product>;
  productNum: number;
  totalPrice: number = 0;
  
  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    
    this.productService.listProducts().subscribe(data => {
      this.products = data;
      this.productData = data;
      this.productNum = data.length;
      this.products.forEach(product => {
        this.totalPrice += product.price;
      })
    });
  }

  delete(id: number) {

  }
}
