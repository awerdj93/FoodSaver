import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/api/model/user';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/api/service/authentication.service';
import { UserService } from 'src/app/api/service/user.service';
import { FormState } from '../shared/model/form-state.model';
import { Product } from 'src/app/api/models';
import { ProductService, ReviewService } from 'src/app/api/services';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  product: Product;
  currentUser: User;
  private params: Params;
  ratings = [false, false, false, false, false];

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private authenticationService: AuthenticationService,
      private productService: ProductService,
      private reviewService: ReviewService
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
      // this.reviewService.createReview({
      //   // order: this.params.id,
      //   star_rating: this.ratingNum(),
      //   remarks: this.form.controls.remarks.value
      // });
    }
  }
}
