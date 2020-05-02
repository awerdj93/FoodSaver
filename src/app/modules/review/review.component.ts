import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { FormState } from '../shared/model/form-state.model';
import { Product, Review, User } from 'src/app/api/models';
import { AuthenticationService, ProductService, ReviewService } from 'src/app/api/services';
import { ModalService } from '../shared/service/modal.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  private params: Params;
  form: FormGroup;
  formState: FormState;
  product: Product;
  currentUser: User;
  ratings = [false, false, false, false, false];
  error: string;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private productService: ProductService,
      private reviewService: ReviewService,
      private modalService: ModalService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit() {
    this.productService.getProduct(this.params.id)
    .subscribe((data: Product) => {
      this.product = data;
    });
    this.form = this.formBuilder.group({
      review: ['', [Validators.required, Validators.maxLength(250)]],
    });
    this.formState = new FormState(this.form);
  }

  rate(i: number) {
    this.ratings.forEach((element, index) => {
      if (index <= i) {
        this.ratings[index] = true;
      } else {
        this.ratings[index] = false;
      }
    });
  }

  ratingNum() : number {
    return this.ratings.filter((x,i) => { return x; }).length;
  }

  onSubmit() {
    if (this.formState.valid) {

      console.log(this.product);
      let review = new Review();
      review.productId = this.product.id;
      review.userId = this.currentUser.id;
      review.sellerId = this.product.userId;
      review.starRating = this.ratingNum();
      review.remarks = this.form.controls.review.value;
      review.createdBy = this.currentUser.id;
      review.lastUpdatedBy = this.currentUser.id;

      this.reviewService.createReview(review,review.sellerId).subscribe(
        data => {
          this.modalService.alert("Success", 'Review sucessfully submitted', 'success')
          .then(() => {
            this.router.navigate(['/profile/orders']);
          });
        },
        error => {
          this.formState.serverErrors = error;
          this.formState.loading = false;
        });;
    }
  }
}
