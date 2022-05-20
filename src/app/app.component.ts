import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { Address } from './models/Address';
import { AddUserRequest } from './models/AddUserRequest';
import { FeleceForm } from './models/FeleceForm';
import { UserForm } from './models/UserForm';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, FeleceForm<UserForm> {
  /* https://docs.rxweb.io/strongly-typed/angular-strongly-typed */

  formGroup!: IFormGroup<UserForm>;
  formBuilder: IFormBuilder;

  countryList = [{ id: 1, name: 'Türkiye' }];

  cityList = [
    { id: 1, name: 'Adana' },
    { id: 2, name: 'Adıyaman' },
    { id: 3, name: 'Afyonkarahisar' },
  ];

  constructor(formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;
  }

  get addressFormGroup(): IFormGroup<Address> {
    return this.formGroup.get('address') as IFormGroup<Address>;
  }

  ngOnInit(): void {
    this.createForm();

    // let addressFormGroup = this.formGroup.controls
    //   .address as IFormGroup<Address>;
    // addressFormGroup.controls.countryId.setValue(1);
  }

  onSubmit(): void {
    this.formGroup.submitted = true;

    const formValues = this.formGroup.value!;
    const request = {
      ...formValues,
      phone: formValues.phone.withCountryCode,
    } as AddUserRequest;

    console.log('Form submitted', request);

    setTimeout(() => {
      this.formGroup.reset();
      this.formGroup.submitted = false;
    }, 2000);
  }

  test(): void {
    this.addressFormGroup.get('cityId')!.enable();
  }

  

  createForm(): void {
    this.formGroup = this.formBuilder.group<UserForm>({
      id: [null],
      firstName: ['', RxwebValidators.required()],
      lastName: ['', RxwebValidators.required()],
      password: [
        '',
        RxwebValidators.compose({
          validators: [
            RxwebValidators.required(),
            RxwebValidators.password({
              validation: {
                minLength: 6,
                maxLength: 50,
                specialCharacter: true,
                digit: true,
                upperCase: true,
                lowerCase: true,
              },
              message: {
                minLength: 'Password must be at least 6 characters long',
                maxLength: 'Password must be less than 50 characters long',
                specialCharacter:
                  'Password must contain at least one special character',
                digit: 'Password must contain at least one digit',
                upperCase:
                  'Password must contain at least one upper case character',
                lowerCase:
                  'Password must contain at least one lower case character',
              },
            }),
          ],
        }),
      ],
      confirmPassword: [
        '',
        [
          RxwebValidators.compare({
            fieldName: 'password',
            message: 'VALIDATION.MESSAGE.PASSWORD_MISMATCH',
          }),
        ],
      ],
      isAcceptedKvkk: [
        false,
        RxwebValidators.requiredTrue({
          message: 'VALIDATION.KVKK_REQUIRED_TRUE',
        }),
      ],
      dob: [
        null,
        [
          RxwebValidators.minDate({
            value: new Date('2021'),
            allowISODate: true,
          }),
          RxwebValidators.maxDate({ value: new Date(), allowISODate: true }),
        ],
      ],
      phone: null,
      address: this.formBuilder.group<Address>({
        countryId: [null, [RxwebValidators.required()]],
        cityId: [
          { value: null, disabled: true },
          RxwebValidators.required({
            conditionalExpression: (x: Address) => this.cityList.length > 0,
            disableExpression: (x: Address) => this.cityList.length === 0,
          }),
        ],
      }),
    });
  }
}
