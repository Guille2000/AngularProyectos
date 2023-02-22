import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  getIdtoken() {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token!);
    const nameIdentifier =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    return nameIdentifier;
  }

  getEmailToken() {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token!);
    const email = decodedToken['email'];
    return email;
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    localStorage.removeItem('token')
  }
}
