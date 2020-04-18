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
      // redirect to home if already logged in
    //   if (!this.authenticationService.currentUserValue) {
    //       this.router.navigate(['/']);
    //   }
    this.currentUser = this.authenticationService.currentUserValue;
    this.route.params.subscribe(params => this.params = params);
  }
 
  ngOnInit() {
    this.productService.getProduct(this.params.id).subscribe(product => {
      this.product = product;
    });
    this.form = this.formBuilder.group({
      remarks: ['', Validators.required, Validators.maxLength(250)],
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
      let review = new Review();
      review.productId = this.product.id;
      review.starRating = this.ratingNum();
      review.remarks = this.form.controls.review.value;

      this.reviewService.createReview(review).subscribe(
        data => {
          this.modalService.alert("Success", 'Review sucessfully submitted', 'success')
          .then(() => { 
            this.router.navigate(['/orders']);
          });
        },
        error => {
          this.formState.serverErrors = error;
          this.formState.loading = false;
        });;
    }
  }
}
