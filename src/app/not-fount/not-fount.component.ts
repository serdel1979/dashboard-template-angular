import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-fount',
  templateUrl: './not-fount.component.html',
  styles: [
  ]
})
export class NotFountComponent {
  
  constructor (private router: Router){}

  year = new Date().getFullYear();

  home(){
    this.router.navigate(['/dashboard/equipos']);
  }

}
