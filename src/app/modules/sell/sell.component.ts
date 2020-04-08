import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/api/models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { AuthenticationService, ProductService } from 'src/app/api/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  currentUser: User;
  form: FormGroup;
  formState: FormState;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, Validators.required],
      type: [null, Validators.required]
    });
    this.formState = new FormState(this.form);
  }

  onSubmit() {
    if (this.formState.valid) {
      this.productService.createProduct({
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        price: this.form.controls.price.value,
        type: this.form.controls.type.value
      })
      .subscribe(
          data => {
              console.log(data);
              this.router.navigate(["/product/" + data.id]);
          },
          error => {
            this.formState.serverErrors = error;
            this.formState.loading = false;
          });
    }
  }
}
