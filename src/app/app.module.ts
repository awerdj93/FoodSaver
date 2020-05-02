import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './modules/users/users.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CatalogComponent } from './modules/catalog/catalog.component';
import { SellComponent } from './modules/sell/sell.component';
import { CartComponent } from './modules/cart/cart.component';
import { ContactComponent } from './modules/contact/contact.component';
import { MapComponent } from './modules/map/map.component';
import { ForgetComponent } from './modules/forget/forget.component';
import { SharedModule } from './modules/shared/shared.module';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPanelComponent } from './components/login-panel/login-panel.component';
import { ErrorComponent } from './components/error/error.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CareerComponent } from './modules/career/career.component';
import { TermsComponent } from './modules/terms/terms.component';
import { VerifyRegisterComponent } from './modules/register/verify-register/verify-register.component';
import { ReviewComponent } from './modules/review/review.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ChatComponent } from './modules/chat/chat.component';
import { OrderComponent } from './modules/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TopBarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CatalogComponent,
    SellComponent,
    CartComponent,
    ContactComponent,
    MapComponent,
    ForgetComponent,
    CheckoutComponent,
    FooterComponent,
    LoginPanelComponent,
    ErrorComponent,
    NotFoundComponent,
    CareerComponent,
    TermsComponent,
    VerifyRegisterComponent,
    ReviewComponent,
    ChatComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
