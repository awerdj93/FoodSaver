import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormState } from '../shared/model/form-state.model';
import { ModalService } from '../shared/service/modal.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  form: FormGroup;
  formState: FormState;
  
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, Validators.required, Validators.email]
    });
    this.formState = new FormState(this.form);
  }
  
  onSubmit() {
    if (this.formState.valid) {
      this.modalService.alert('Forget Password', `An email will be sent to ${this.form.controls.email.value} to reset your password`, 'success')
    .then(() => {  });
    }  
  }

}
