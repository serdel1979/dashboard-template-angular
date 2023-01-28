import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('submit')
    .subscribe(console.log);
  }


}
