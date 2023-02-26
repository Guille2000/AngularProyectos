import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colaborador, respuestaAuth } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {


  constructor(private http:HttpClient) { }

  url = environment.apiBase


  
  buscarColaboradores(email:string){
    return this.http.get(`${this.url}/buscar/colaboradores?email=${email}`)
  }

  agregarColaborador(proyectoId: number, email: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url}/agregar/colaborador?proyectoId=${proyectoId}`, email, { headers });
  }

  listarColaboradores(proyectoId:number){
    return this.http.get(`${this.url}/listar/colaboradores?proyectoId=${proyectoId}`)
  }

  eliminarColaborador(id:number){
    return this.http.delete(`${this.url}/eliminar/colaborador?Id=${id}`)
  }


}
