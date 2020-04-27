import { Component, OnInit } from '@angular/core';
import { User, Product } from 'src/app/api/models';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { AuthenticationService, ProductService } from 'src/app/api/services';
import { Router } from '@angular/router';
import { ModalService } from '../shared/service/modal.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {
  currentUser: User;
  form: FormGroup;
  formState: FormState;
  error: string;
  file = null;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) { 
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      expiry: ['', [Validators.required]]
    });
    this.formState = new FormState(this.form);
  }

  onSubmit() {
    console.log(this.form)
    if (this.formState.valid) {
      let product = new Product();
      product.name = this.form.controls.name.value;
      product.description = this.form.controls.description.value;
      product.price = this.form.controls.price.value;
      product.category = this.form.controls.category.value;
      product.expiry_dt = new Date(this.form.controls.expiry.value);
      console.log(product);
      this.productService.createProduct(product).subscribe(
          data => {
            this.modalService.alert("Success", 'Item successfully created', 'success')
            .then(() => { 
              this.router.navigate(['/product/' + data]);
            }); 
          },
          error => {
            this.formState.serverErrors = error;
            this.formState.loading = false;
          });
    }
    else {
      this.error = 'Error occured';
    }
  }

  onUpload(event) {
    console.log(event);
    this.file = event.target.file[0];
    console.log(this.file);
    //base64 string
  }
}
