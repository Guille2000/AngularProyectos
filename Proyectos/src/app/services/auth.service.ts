import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { respuestaAuth } from '../interfaces/interfaces';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url = environment.apiBase

  constructor(private http:HttpClient) { }

  registro(email:string, password:string){
    return this.http.post(`${this.url}/auth/crear`, {email, password})
  }

  login(email:string, password:string):Observable<respuestaAuth>{
    return this.http.post<respuestaAuth>(`${this.url}/auth/login`, {email, password})
    .pipe(
      tap(resp => {
        localStorage.setItem('token', resp.token)
      })
    )
    }
}
