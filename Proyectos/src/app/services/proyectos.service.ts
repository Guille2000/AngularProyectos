import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProyectoCreacionDTO } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http:HttpClient) { }

  url = environment.apiBase

  crearProyecto(proyecto:ProyectoCreacionDTO):Observable<ProyectoCreacionDTO>{
    return this.http.post<ProyectoCreacionDTO>(`${this.url}/agregar`, proyecto)
  }

  getProyectosId(id:string){
    return this.http.get(`${this.url}/listado?userId=${id}`)
  }
  
  getProyectoId(id:string){
    return this.http.get(`${this.url}/id?Id=${id}`)
  }

  editarProyecto(id:string, proyecto:ProyectoCreacionDTO):Observable<ProyectoCreacionDTO>{
    return this.http.put<ProyectoCreacionDTO>(`${this.url}/editar?Id=${id}`, proyecto)
  }
  eliminarProyecto(id:string){
    return this.http.delete(`${this.url}/eliminar?Id=${id}`)
  }

}
