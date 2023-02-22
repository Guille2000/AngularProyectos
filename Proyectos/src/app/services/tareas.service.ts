import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TareaCreacionDTO } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http:HttpClient) { }


  url = environment.apiBase

  crearTareas(id:number, tarea:TareaCreacionDTO):Observable<TareaCreacionDTO>{
    return this.http.post<TareaCreacionDTO>(`${this.url}/tarea/agregar?proyectoId=${id}`, tarea )
  }

  

}
