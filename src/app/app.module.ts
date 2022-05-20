import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  ReactiveFormConfig,
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AppComponent } from './app.component';
RxwebValidators.required({ message: 'VALIDATION.REQUIRED' });
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    NgxJsonViewerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    ReactiveFormConfig.set({
      validationMessage: {
        //#region default validation messages
        required: 'VALIDATION.REQUIRED',
        minDate: 'VALIDATION.MIN_DATE',
        maxDate: 'VALIDATION.MAX_DATE',
        //#endregion default validation messages

        //#region custom validation messages
        customValidationKey: 'VALIDATION.CUSTOM_VALIDATION_KEY',
        //#endregion custom validation messages
      },
    });
  }
}
