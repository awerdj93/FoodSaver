import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

/**
 * Modal dialog for confirmation and alert.
 *
 * Use the ModalService.confirm and ModalService.alerts
 */
@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.scss']
})
export class ModalConfirmationComponent implements OnInit {
  public result: Subject<boolean>;
  title: string;
  text: string;
  type: string;
  cancelLabel: string;
  confirmLabel: string;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  action(value: boolean) {
    this.bsModalRef.hide();
    this.result.next(value);
    this.result.complete();
  }

  /*
  To Call this method
    const initialState = {
      text: 'Hello',
      cancelLabel: 'Cancel', // can be empty ''
      confirmLabel: 'Delete'
    };
    this.modalRef = this.modalService.show(ModalConfirmationComponent, {initialState} );
    this.modalRef.content.result.subscribe(data => {
    });

  */
}
