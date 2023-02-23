import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaCreacionDTO } from 'src/app/interfaces/interfaces';
import { TareasService } from 'src/app/services/tareas.service';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {

  constructor(public dialog: MatDialog, private tareaService:TareasService
    ){

  }

  @Input() tareasHijo:TareaCreacionDTO[] = []

  ngOnInit(): void {
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
