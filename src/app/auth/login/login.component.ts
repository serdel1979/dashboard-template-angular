import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error = '';

  loading: boolean = false;

  miFormulario: FormGroup = this.fb.group({
    Usuario: ['', [Validators.required]],
    Password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) { }



  get f() { return this.miFormulario.controls; }


  public iniciarSesion(): void {
    this.recaptchaV3Service.execute('submit')
      .subscribe({
        next: x => {
          this.login();
        },
        error: err => console.error("error de captcha")
      });
  }

  login() {
    this.loading = true;
    const { Usuario, Password } = this.miFormulario.value;

    this.authService.login(Usuario, Password)
      .subscribe((resp) => {
        if (resp) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = "Comprobar los datos ingresados"
        }
      }, (err) => {
        if (err.status == 400) {
          this.error = err;
        } else {
          //this.error = "No se puede iniciar sesión";
          this.error = err
//          JSON.stringify(err, ["message", "arguments", "type", "name"])
        };
        this.loading = false;
      }
      )
  }

registrar(){
  this.router.navigate(['/register']);
}

}
