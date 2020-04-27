import { Component, OnInit } from '@angular/core';
import { Product, User } from 'src/app/api/models';
import { ProductService, CartService, UserService, AuthenticationService, ReviewService } from 'src/app/api/services';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalService } from '../shared/service/modal.service';
import { ChatService } from 'src/app/api/service/chat.service';
import { Chat } from 'src/app/api/model/chat';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private params: Params;
  currentUser: User;
  product: Product;
  error: string;
  seller: User;
  sellerRating: number;
 
  constructor(private productService: ProductService,
    private cartService: CartService,
    private chatService: ChatService,
    private userService: UserService,
    private reviewService: ReviewService,
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => this.params = params);
      this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.productService.getProduct(this.params.id)
    .subscribe((data: Product) => {
      this.product = data;
      this.userService.getUser(data.userId).subscribe((user: User) => {
        this.seller = user;
      });
      this.reviewService.getAvgRating(data.userId).subscribe((rating: number) => {
        this.sellerRating = rating;
      });
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

  showChatBtn() {
    if (this.product !== this.currentUser.id) {

    }
  }

  chatWithSeller() {
    this.userService.getUser(this.product.userId)
    .subscribe((user: User) =>{
      let chat = new Chat();
      chat.sender = this.currentUser.id;
      chat.recipientId = user.id;
      chat.recipientName = user.name;
      this.chatService.createChat(chat)
      .subscribe(data => {
          this.router.navigate(['/chat/' + data]);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
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
