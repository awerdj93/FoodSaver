import { NgModule } from '@angular/core';
import { SpinnerComponent } from './components/spinner/spinner/spinner.component';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { ModalConfirmationComponent } from './components/modal/modal-confirmation/modal-confirmation.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from './service/modal.service';
import { ModalModule } from 'ngx-bootstrap/modal/';
import { InputErrorsComponent } from './components/input-errors/input-errors.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    PaginationComponent,
    ModalConfirmationComponent,
    InputErrorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [
    SpinnerComponent,
    PaginationComponent,
    InputErrorsComponent
  ],
  entryComponents: [
    ModalConfirmationComponent
  ],
  providers: [
    
]})
export class SharedModule { }
