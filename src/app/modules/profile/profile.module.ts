
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    AddressComponent,
    ProfileInfoComponent,
    MyProductsComponent,
    EditProductComponent,
    MyOrdersComponent,
    MyReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AccordionModule.forRoot(),
    MatSlideToggleModule
  ]
})
export class ProfileModule { }
