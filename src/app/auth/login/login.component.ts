import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  captcha: string = "";
  email: string = "sdlbsso@gmail.com";

  resolved(captchaResponse: string){
    this.captcha = captchaResponse;
    console.log(`Captcha resuelto con: ${this.captcha}`);
  }


}
