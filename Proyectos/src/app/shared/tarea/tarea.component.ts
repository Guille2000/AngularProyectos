import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaCreacionDTO } from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TareasService } from 'src/app/services/tareas.service';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  eliminada:boolean = false;

  constructor(public dialog: MatDialog, private tareaService:TareasService,
    private proyectoService: ProyectosService,

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
