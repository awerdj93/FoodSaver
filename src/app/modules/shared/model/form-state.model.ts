import { FormGroup, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

export class FormState {
    /**
     * This is the server errors from the REST api typically as ApiErrors
     */
    private _serverErrors: HttpErrorResponse;
    //private _globalErrors: string[] = new Array<string>();
    public submitted = false;
    public loading = false;

    constructor(public form: FormGroup = null
    ) {}
    
    get valid(): boolean {
        this.submitted = true;
        this._serverErrors = null;
        //this._globalErrors.length = 0;
        if (this.form == null || !this.form.invalid) {
            this.loading = true;
            return true;
        }
        return false;
    }

    set serverErrors(value: HttpErrorResponse) {
        this._serverErrors = value;
        this.loading = false;
    }

    get errors(): {[key: string]: ValidationErrors}  {
        const result: {[key: string]: ValidationErrors} = {};
        if (!this.submitted) {
            return result;
        }

        if (this.form) {
            for (const key of Object.keys(this.form.controls)) {
                const value = this.form.controls[key];
                result[key] = value.errors;
            }
        }
        return result;
    }

    get field() {
        return this.form.controls;
    }
}