import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ErrorResponse } from '../interfaces/error.interface';
import { AuthResponse } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  msgok = '';
  msg = '';
  user!: AuthResponse;

  loading: boolean = false;

  get f() { return this.miFormulario.controls; }

  miFormulario: FormGroup = this.fb.group({
    Usuario: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private recaptchaV3Service: ReCaptchaV3Service,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService
  ) { }


  public verCaptcha(): void {
    this.recaptchaV3Service.execute('submit')
      .subscribe({
        next: x => {
          this.registrar();
        },
        error: err => console.error("error de captcha")
      });
  }



  registrar() {
    this.msg = "";
    this.msgok = "";
    this.loading = true;

    const { Usuario, Email, Password } = this.miFormulario.value;
    this.authService.registrar(Usuario, Email, Password)
      .subscribe(() => {
        this.msgok = "Solicitud enviada";
        this.loading = false;
      }, (err: ErrorResponse) => {
        // if (err.code == 400) {
        //   this.msg = err.error;
        // } else {
        //   this.msg = `${err.status.description}`
        // };
        this.msg = err.error[0].description;
        this.loading = false;
      }
      )
  }



  login() {
    this.router.navigate(['/login']);
  }

}
