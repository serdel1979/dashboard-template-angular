import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    RecaptchaV3Module
  ],
  providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: "6LcI1DEkAAAAAKrBmOaHxQxCxjQluLlzl_dl48Op"}]
})
export class AuthModule { }
