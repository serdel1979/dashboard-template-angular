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

  public user!: Observable<AuthResponse>;
  private userSubject!: BehaviorSubject<AuthResponse>;

  constructor(private http: HttpClient,  private router: Router) { 
    this.userSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('user') || "[]"));
    this.user = this.userSubject.asObservable();
  }




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
        this.userSubject.next(resp);
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


  isAuthenticated():boolean{
     const { userName } = JSON.parse(localStorage.getItem('user') || "[]");
     return userName != null;
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  
  isAdmin():boolean{
    const { claims } = JSON.parse(localStorage.getItem('user') || "[]");
    if (claims){
      return claims != 0;
    }
    return false;
  }

}
