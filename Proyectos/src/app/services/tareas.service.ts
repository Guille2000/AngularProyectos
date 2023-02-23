import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TareaCreacionDTO } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  tareaCreada:TareaCreacionDTO[] = []
  tareaId!:number;
  private tareasSubject = new BehaviorSubject<TareaCreacionDTO[]>([]);


  constructor(private http:HttpClient) { }


  url = environment.apiBase
  private tareaSuccess = new BehaviorSubject<boolean>(false);


  crearTareas(id:number, tarea:TareaCreacionDTO):Observable<TareaCreacionDTO>{
    return this.http.post<TareaCreacionDTO>(`${this.url}/tarea/agregar?proyectoId=${id}`, tarea )
  }

  getTareas(id:number){
    return this.http.get(`${this.url}/tarea/listado?projectId=${id}`)
  }

  editarTareas(tarea:TareaCreacionDTO, id:number):Observable<TareaCreacionDTO>{
    return this.http.put<TareaCreacionDTO>(`${this.url}/tarea/editar?Id=${id}`, tarea)
  }

  emitTareaSuccess(success: boolean) {
    this.tareaSuccess.next(success);
  }

  getTareaSuccess() {
    return this.tareaSuccess.asObservable();
  }

  get tareas$() {
    return this.tareasSubject.asObservable();
  }
  

  

}
