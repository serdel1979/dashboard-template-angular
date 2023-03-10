import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  constructor(private authService: AuthServiceService, private router: Router){

  }



  logout(){
    this.authService.logout();
  }

  solicitudes(){
    this.router.navigate(['/dashboard']);
  }

  historial(){
    this.router.navigate(['/dashboard/historial']);
  }
  usuarios(){
    this.router.navigate(['/dashboard/usuarios']);
  }
  equipos(){
    this.router.navigate(['/dashboard/equipos']);
  }

  isAdmin():boolean{
    return this.authService.isAdmin();
  }


}
