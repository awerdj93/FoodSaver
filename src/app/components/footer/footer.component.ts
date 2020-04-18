import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/modules/shared/service/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormState } from 'src/app/modules/shared/model/form-state.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  form: FormGroup;
  formState: FormState;

  constructor(private formBuilder: FormBuilder,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.formState = new FormState(this.form);
  }

  onSubscribe() {
    if (this.formState.valid) {
      this.modalService.alert('Newsletter Subscribed', `Welcome to our newsletter. An email will be sent to ${this.form.controls.email.value}`, 'success')
      .then(() => { 
        this.form.controls.email.setValue('');
      });
    }  
  }
}
