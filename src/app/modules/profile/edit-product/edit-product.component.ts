import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/api/models';
import { ProductService, CartService } from 'src/app/api/services';
import { ModalService } from '../../shared/service/modal.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private params: Params;
  product: Product;
  error: string;
 
  constructor(private productService: ProductService,
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

  edit() {
   
    this.productService.updateProduct(this.product);
    // .subscribe(data => {
    //   this.product = data;
    // });
  }
}
