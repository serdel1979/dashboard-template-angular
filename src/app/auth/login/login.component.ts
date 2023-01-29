import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AuthServiceService } from '../../services/auth-service.service';
import { AuthResponse } from '../interfaces/usuario.interface';
import { catchError, first, map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  error = '';
  user!: AuthResponse;

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
      .subscribe(data => {
        this.user = data;
        if (this.user) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = "Comprobar los datos ingresados"
        }
      }, (err: any) => {
        if (err.status == 400) {
          this.error = err.error;
        } else {
          this.error = "Problema de conexión"
        };
        this.loading = false;
      }
      )
  }

registrar(){
  this.router.navigate(['/register']);
}

}
