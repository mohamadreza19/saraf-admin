import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { SignInService } from './sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    AngularSvgIconModule,
    NgClass,
    NgIf,
    ButtonComponent,
    InputComponent,
  ],
  providers: [SignInService],
})
export class SignInComponent implements OnInit {
  form!: CustomFormGroup;
  submitted = false;
  passwordTextType!: boolean;

  constructor(private service: SignInService) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    const controls = {
      username: new FormControl2('', {
        label: 'نام کاربری',
        type: 'text',
        validators: [Validators.required],
      }),
      password: new FormControl2('', {
        label: 'رمز ورود',
        type: 'text',
        validators: [Validators.required, Validators.minLength(6)],
      }),
    };
    this.form = new CustomFormGroup(controls);
  }

  get f() {
    return this.form.controls;
  }

  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }

  onSubmit() {
    // this.form.markAsTouched();
    this.form.markAllAsTouched();
    this.submitted = true;

    const { username, password } = this.form.value;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.service.login({
      username,
      password,
    });
    // this._router.navigate(['/']);
  }
  getAsFormControl2(control: any): FormControl2 {
    return control;
  }
}
