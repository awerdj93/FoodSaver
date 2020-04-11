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
    this.cartService.addProductToCart(this.product.id)
    .subscribe(data => {
        this.product = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        //this.modalService.alert("Error", error.error, 'danger');
        //this.loading = false;
      });
    // let token = localStorage.getItem('token');
    // const httpOptions = {
    //   headers: {
    //       'authorization': token
    //   }
    // };
    // axios.get('https://h1oszwe4ta.execute-api.ap-southeast-1.amazonaws.com/stag/order/api/v1/orders/3', httpOptions)
    // .then((response) => {
    //   console.log(response);
    // }, (error) => {
    //   console.log(error);
    // });
  }
}
