
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { OrderComponent } from './order/order.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: '', component: ProfileComponent, children: [
      { path: '', redirectTo: 'info'},
      { path: 'password', component: ChangePasswordComponent },
      { path: 'address', component: AddressComponent },
      { path: 'order', component: OrderComponent },
      { path: 'info', component: ProfileInfoComponent },
      { path: 'products', component: MyProductsComponent },
      { path: 'products/:id', component: EditProductComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
