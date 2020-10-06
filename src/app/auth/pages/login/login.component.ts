import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from '../../stores/auth';

const addErrors = (control: AbstractControl, error: ValidationErrors): ValidationErrors => {
  const oldErrors = control.errors;
  const newErrors = { ...(oldErrors || {}), ...error };
  control.setErrors(newErrors);
  return newErrors;
};

const removeErrors = (control: AbstractControl, ...keys: string[]): null => {
  const oldErrors = control.errors || {};
  keys.forEach((k) => delete oldErrors[k]);
  control.setErrors(Object.keys(oldErrors).length ? oldErrors : null);
  return null;
};

@Component({
  selector: 'sv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public registerForm: FormGroup;
  public registerActive = false;
  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router, private alert: AlertService) {}

  private mustMatchValidator(control1Name: string, control2Name: string): ValidatorFn {
    return (group: AbstractControl) => {
      const control1 = group.get(control1Name);
      const control2 = group.get(control2Name);
      if (!control1 || !control2) {
        return null;
      }
      if (!control1.value || !control2.value || control1.value === control2.value) {
        removeErrors(control1, 'matching');
        return removeErrors(control2, 'matching');
      } else {
        addErrors(control1, { matching: true });
        return addErrors(control2, { matching: true });
      }
    };
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group(
      {
        email: ['', Validators.compose([Validators.email, Validators.required])],
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
      },
      { validators: [this.mustMatchValidator('password', 'passwordConfirm')] },
    );

    this.loginForm.valueChanges.subscribe((value) => {
      this.registerForm.patchValue({ ...value }, { emitEvent: false });
    });

    this.registerForm.valueChanges.subscribe((value) => {
      this.loginForm.patchValue({ ...value }, { emitEvent: false });
    });
  }

  public loginWithEmailAndPassword(): void {
    const { email, password } = this.loginForm.value;
    this.auth
      .signin(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: firebase.auth.Error) => {
        this.alert.messageDialog('Login Error', err.message, 'error');
      });
  }

  public register(): void {
    const { email, password } = this.registerForm.value;
    this.auth
      .signup(email, password)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: firebase.auth.Error) => {
        this.alert.messageDialog('Registration Error', err.message, 'error');
      });
  }

  public signInWithGoogle(): void {
    this.auth
      .loginWithGoogle()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((err: firebase.auth.Error) => {
        this.alert.messageDialog('Google signin error', err.message, 'error');
      });
  }
}
