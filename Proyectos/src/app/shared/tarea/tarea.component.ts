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

  constructor(public dialog: MatDialog, private tareaService:TareasService,
    private proyectoService: ProyectosService,

    ){

  }

  @Input() tareasHijo:TareaCreacionDTO[] = []

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

  editar(id:number){
    this.tareaService.tareaId = id 
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
    });
  }


}
