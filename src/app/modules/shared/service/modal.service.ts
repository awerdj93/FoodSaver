import { Injectable } from '@angular/core';
import { ModalConfirmationComponent } from '../components/modal/modal-confirmation/modal-confirmation.component';
import { take, finalize } from 'rxjs/operators';
import { Subject, Observable, Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal/';


/**
 * Modal services
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

   constructor(private modalService: BsModalService) { }

  alert(title: string, text: string, type?: string, confirmLabel?: string, autoclose$?: Observable<boolean>): Promise<boolean> {
    const initialState = {
      title,
      text,
      type,
      cancelLabel: '',
      confirmLabel: confirmLabel || 'OK',
      result: new Subject<boolean>()
    };
    const modalRef = this.modalService.show(ModalConfirmationComponent, { initialState, ignoreBackdropClick: true, keyboard: false });
    let autocloseSubscription: Subscription;
    if (autoclose$) {
      autocloseSubscription = autoclose$.pipe(take(1)).subscribe((result) => {
        modalRef.hide();
        modalRef.content.result.next(result);
        modalRef.content.result.complete();
      });
    }
    return modalRef.content.result
      .pipe(
        finalize(() => {
          if (autocloseSubscription) {
            autocloseSubscription.unsubscribe();
          }
        }),
        take(1)
      )
      .toPromise();
  }

  confirm(title: string, text: string, type?: string): Promise<boolean> {
    const initialState = {
      title,
      text,
      type,
      cancelLabel: 'No',
      confirmLabel: 'Yes',
      result: new Subject<boolean>()
    };
    const modalRef = this.modalService.show(ModalConfirmationComponent, { initialState, ignoreBackdropClick: true });
    return modalRef.content.result.pipe(take(1)).toPromise();
  }

  // prompt(title: string, formInputs: FormInput[], submitLabel?: string, cancelLabel?: string, additionalEvent?: any[], className?: string): Observable<any> {
  //   const initialState = {
  //     title,
  //     submitLabel,
  //     cancelLabel,
  //     additionalEvent,
  //     formInputs,
  //     result: new Subject<any>()
  //   };
  //   // tslint:disable-next-line: max-line-length
  //   const modalRef = this.modalService.show(ModalInputComponent, { class: (className ? className : ''), initialState, ignoreBackdropClick: true, keyboard: false });
  //   return modalRef.content.result.pipe(finalize(() => modalRef.hide()));
  // }

  closeAllModal() {
    // close all opened modal dialog.
    for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
      this.modalService.hide(i);
    }
  }
}
