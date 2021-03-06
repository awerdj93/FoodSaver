import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/api/models';
import { ProductService, CartService } from 'src/app/api/services';
import { ModalService } from '../../shared/service/modal.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../../shared/model/form-state.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private params: Params;
  form: FormGroup;
  formState: FormState;
  error: string;
  product: Product;
 
  constructor(private productService: ProductService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { 
    this.route.params.subscribe(params => this.params = params);
  }

  ngOnInit(): void {
    this.productService.getProduct(this.params.id)
    .subscribe(data => {
      this.product = data;
      this.form = this.formBuilder.group({
        name: [data.name, Validators.required],
        description: [data.description, Validators.required],
        price: [data.price, Validators.required],
        category: [data.category, Validators.required]
      });
      this.formState = new FormState(this.form);
    });
  }
  
  onSubmit() {
    this.product.name = this.form.controls.name.value;
    this.product.description = this.form.controls.description.value;
    this.product.price = this.form.controls.price.value;
    this.product.category = this.form.controls.category.value;

    this.productService.updateProduct(this.product)
    .subscribe(data => {
      this.product = data;
      this.modalService.alert('Product updated', 'Product successfully updated.', 'success')
        .then(() => this.router.navigate(['/profile/products']));
    });
  }
}
