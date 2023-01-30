import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, RegistroUsuario, Usuario } from '../auth/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  private baseUrl: string = environment.baseUrl;

  private _usuario!: AuthResponse;

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
        this._usuario = resp;
        return resp;
      })
    )
  }

  registrar(Usuario: string, Email: string, Password: string){
    const url = `${this.baseUrl}/usuarios/solicitar`
    const body = {
      Usuario,
      Email,
      Password
    }
    return this.http.post<RegistroUsuario>(url,body)
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
