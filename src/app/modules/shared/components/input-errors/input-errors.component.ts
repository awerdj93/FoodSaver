import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

/**
 * Used to display input validation errors
 */
@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss']
})
export class InputErrorsComponent implements OnInit {
  @ViewChild('template', {static: true}) template;
  @Input() errors: ValidationErrors;
  @Input() label: string;

  /**
   * These contain the client side validation messages by validator type
   */
  @Input() messages: {[key: string]: any; };
  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit() {
    // This is needed to remove the app-input-errors wrapper
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  get errorMessages(): string[] {
    const result: string[] = new Array();
    if (this.errors) {
      for (const key of Object.keys(this.errors)) {
        const value = this.errors[key];
        if (key === 'server') {
          value.forEach((element: string) => {
            const serverMessage = element.replace('Input', this.label);
            result.push(serverMessage);
          });
        } else {
          let clientMessage;
          if (this.messages) {
            clientMessage = this.messages[key];
          }
          if (!clientMessage && key === 'required') {
            clientMessage = this.label + ' is required';
          }
          if (!clientMessage && key === 'email') {
            clientMessage = this.label + ' format is wrong';
          }
          if (!clientMessage && key === 'pattern') {
            clientMessage = this.label + ' is limited to a-Z, 0-9, space, comma, full stop and question mark';
          }
          if (!clientMessage && key === 'maxlength') {
            clientMessage = this.label + ' should not exceed the length of ' + this.errors[key].requiredLength;
          }
          if (!clientMessage && key === 'minlength') {
            clientMessage = this.label + ' should not be lesser than the length of ' + this.errors[key].requiredLength;
          }
          if (!clientMessage) {
            console.warn('No message for validator ' + key);
          } else {
            result.push(clientMessage);
          }
        }
      }
    }
    return result;
  }

}
