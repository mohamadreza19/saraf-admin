import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { FormControl2 } from 'src/app/shared/components/form-builder2/form-builder2.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { CustomFormGroup } from 'src/app/shared/form-builder/form-builder.component';
import { SignInService } from './sign-in.service';
import { lastValueFrom } from 'rxjs';
import { LoadingSnackbar } from 'src/app/shared/components/snackbars/loading-snackbar/loading-snackbar.component';
import { LoadingSnackbarService } from 'src/app/core/services/loading-snackbar.service';
import { PlatformService } from 'src/app/core/services/platform.service';

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
  pt = inject(PlatformService);
  constructor(
    private service: SignInService,
    private router: Router,

    private loadingSnackbar: LoadingSnackbarService,
  ) {}

  onClick() {
    console.log('Button clicked');
  }

  ngOnInit(): void {
    const controls = {
      username: new FormControl2('', {
        label: $localize`نام کاربری`,
        type: 'text',
        validators: [Validators.required],
      }),
      password: new FormControl2('', {
        label: $localize`رمز ورود`,
        type: 'password',
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

  async onSubmit() {
    // this.form.markAsTouched();
    this.form.markAllAsTouched();
    this.submitted = true;

    const { username, password } = this.form.value;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    try {
      await lastValueFrom(
        this.service.login({
          username,
          password,
        }),
      );

      this.router.navigate(['/']);
    } catch (error) {
      this.loadingSnackbar.openError($localize`نام کاربری یا پسورد وارد شده صحیح نمی‌باشد`);
    }
  }
  getAsFormControl2(control: any): FormControl2 {
    return control;
  }
}
