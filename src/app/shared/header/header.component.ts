import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { AuthResponse } from '../../auth/interfaces/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  user!: AuthResponse;
  usr!:string;

  constructor(private authService: AuthServiceService){}


  ngOnInit() {
    const { userName } = JSON.parse(localStorage.getItem('user') || "[]");
    this.usr = userName;
    this.authService.user.subscribe(x => this.user = x);
  }



  isAuthenticed():boolean{
    return this.authService.isAuthenticated();
  }

}
