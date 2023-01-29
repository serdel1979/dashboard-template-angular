import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../auth/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private baseUrl: string = environment.baseUrl;

  private _usuario!: Usuario;

  private userSubject!: BehaviorSubject<AuthResponse>;
  public user!: Observable<AuthResponse>;

  get usuario(){
    return this._usuario;
  }


  constructor(private http: HttpClient,  private router: Router) { }




  login(Usuario: string, Password: string):Observable<AuthResponse>{
    const url = `${this.baseUrl}/usuarios/login`
    const body = {
      Usuario,
      Password
    }
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      map( resp =>{
        localStorage.setItem('user', JSON.stringify(resp));
        return resp;
      })
    )


  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }



}
