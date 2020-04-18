import { Component, OnInit } from '@angular/core';
import { Product, Cart } from 'src/app/api/models';
import { ProductService, CartService } from 'src/app/api/services';
import { ModalService } from '../shared/service/modal.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  productNum: number;
  
  constructor(private productService: ProductService,
    private modalService: ModalService,
    private cartService: CartService) {
     
  }

  ngOnInit(): void {
    this.cart = new Cart();
    this.refresh();
  }

  refresh() {
    this.cartService.listCart().subscribe((data: Cart) => {
      this.cart = data;
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  delete(id: number) {
    console.log('deleteing')
    this.cartService.deleteProductFromCart(id).subscribe(data => {
      this.refresh();
      this.modalService.alert("Success", 'Item Deleted', 'success');
    });
  }
}
