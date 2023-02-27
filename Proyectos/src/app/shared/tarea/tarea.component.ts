import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaCreacionDTO } from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TareasService } from 'src/app/services/tareas.service';
import { TokenService } from 'src/app/services/token.service';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  eliminada:boolean = false;
  taskCompleted:boolean = false 
  idToken:string = ''
  email:any = ''

  constructor(public dialog: MatDialog, private tareaService:TareasService,
    private proyectoService: ProyectosService, private tokenService:TokenService

    ){

  }

  @Input() tareasHijo:TareaCreacionDTO[] = []
  @Input() esAdmin:boolean = false 

  ngOnInit(): void {
    this.tareaService.getTareaSuccess().subscribe((success) => {
      if (success) {
        this.tareaService.getTareas(this.proyectoService.projectId).subscribe((tareas:any) => {
          this.tareasHijo = tareas 
        });
        this.tareaService.emitTareaSuccess(false);
      }
    });

    const id = this.tareasHijo[0].id; 
    this.email = localStorage.getItem(`email-${id}`);
    const estado = localStorage.getItem(`tarea-${id}`);
    if (estado !== null) {
      this.taskCompleted = estado === 'true';
    }
  }

  toggleTarea(id:number){
    this.taskCompleted = !this.taskCompleted;
    this.tareaService.completarTarea(id, this.taskCompleted)
    .subscribe(data =>{
      this.email = this.tokenService.getEmailToken()
      localStorage.setItem(`tarea-${id}`, this.taskCompleted.toString());
      localStorage.setItem(`email-${id}`, this.email)

      if (this.taskCompleted) {
        const tareaCompletada = this.tareasHijo.find(tarea => tarea.id === id);
        if (tareaCompletada) {
          tareaCompletada.completadaPor = this.email;
        }
      }
    })
  }

  getIdToken(){
    this.idToken = this.tokenService.getIdtoken();
  }
  eliminar(id:number){
    if(confirm('¿Desea eliminar esta tarea?')){
      this.tareaService.eliminarTarea(id)
      .subscribe(data => {
        this.eliminada = true 
        this.tareaService.emitTareaSuccess(true)
        setTimeout(() => {
          this.eliminada = false
        }, 2000)
      })
    }
  }

  editar(id:number){
    this.tareaService.tareaId = id 
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      width: '500px',
      height: '300px',
    });


    dialogRef.afterClosed().subscribe((data) => {
      this.tareaService.tareaId = undefined 
    });
  }


}
