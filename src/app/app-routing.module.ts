import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { UsersComponent } from './modules/users/users.component';
import { RegisterComponent } from './modules/register/register.component';
import { CatalogComponent } from './modules/catalog/catalog.component';
import { SellComponent } from './modules/sell/sell.component';
import { CartComponent } from './modules/cart/cart.component';
import { ContactComponent } from './modules/contact/contact.component';
import { ProductComponent } from './modules/product/product.component';
import { MapComponent } from './modules/map/map.component';
import { ForgetComponent } from './modules/forget/forget.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { CareerComponent } from './modules/career/career.component';
import { TermsComponent } from './modules/terms/terms.component';
import { ReviewComponent } from './modules/review/review.component';
import { ChatComponent } from './modules/chat/chat.component';
import { OrderComponent } from './modules/order/order.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'users', component: UsersComponent},//, canActivate: [AuthGuard]},
  { path: 'sell', component: SellComponent},//, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},//, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},//, canActivate: [AuthGuard]}, 
  { path: 'cart', component: CartComponent },//, canActivate: [AuthGuard]},
  { path: 'contact', component: ContactComponent },//, canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductComponent },//, canActivate: [AuthGuard]},
  { path: 'map', component: MapComponent },//, canActivate: [AuthGuard]},
  { path: 'forget', component: ForgetComponent},//, canActivate: [AuthGuard]},
  { path: 'catalog', component: CatalogComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'career', component: CareerComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'chat/:id', component: ChatComponent },
  { path: 'review/:id', component: ReviewComponent },//, canActivate: [AuthGuard]},
  { path: 'profile', data: { preload: true }, loadChildren: () => import('./modules/profile/profile.module').then(mod => mod.ProfileModule) },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
