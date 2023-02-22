import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProyectosListado } from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormularioTareaComponent } from 'src/app/shared/formulario-tarea/formulario-tarea.component';


@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss']
})
export class VerProyectoComponent implements OnInit{
  projectId!: number;
  proyecto:ProyectosListado[] = []
  constructor(private activatedRoute:ActivatedRoute,
    private proyectoService:ProyectosService,
    public dialog: MatDialog){

  }
  ngOnInit(): void {
   this.activatedRoute.params
   .pipe(
    switchMap( ({id}) => this.proyectoService.getProyectoId(id))
   )
   .subscribe((data:any) => {
      this.proyecto.push(data)
      this.proyectoService.projectId = data.id 
   })
  }

  openDialog() {

    const dialogRef = this.dialog.open(FormularioTareaComponent, 
      {
        width: '500px',
        height:'300px'
    });

    dialogRef.afterClosed()
    .subscribe(data => {
    })
  }
}

