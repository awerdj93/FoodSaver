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
  cart: Cart;
  productNum: number;
  
  constructor(private productService: ProductService,
    private modalService: ModalService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.refresh();
  }
  refresh() {
    this.cartService.listCart().subscribe(data => {
      this.cart = data;
      console.log(data);
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
