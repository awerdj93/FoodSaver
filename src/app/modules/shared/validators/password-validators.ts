import { ValidationErrors, FormControl, AbstractControl } from '@angular/forms';


export class PasswordValidators {
    static match(control: AbstractControl) {
        let match = true;
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;
        
        if (password !== confirmPassword) {
            match = false
            control.get('confirmPassword').setErrors({ match: false });
        }

        return match ? null : { match: false }
    }
}
