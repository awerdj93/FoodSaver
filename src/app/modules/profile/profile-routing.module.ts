
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyReviewsComponent } from './my-reviews/my-reviews.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'info'},
      { path: 'password', component: ChangePasswordComponent },
      { path: 'address', component: AddressComponent },
      { path: 'orders', component: MyOrdersComponent },
      { path: 'info', component: ProfileInfoComponent },
      { path: 'products', component: MyProductsComponent },
      { path: 'products/:id', component: EditProductComponent },
      { path: 'reviews', component: MyReviewsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
