import { Component, OnInit } from '@angular/core';
import { AuthResponse, Usuario } from '../../auth/interfaces/usuario.interface';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario!: AuthResponse;

  constructor(private authService: AuthServiceService){
    this.usuario = this.authService.usuario;
  }
  ngOnInit(){
    this.usuario = this.authService.usuario;

  }

}
