import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import {
  ProyectosListado,
  TareaCreacionDTO,
} from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormularioTareaComponent } from 'src/app/shared/formulario-tarea/formulario-tarea.component';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss'],
})
export class VerProyectoComponent implements OnInit {
  projectId$: Observable<number>;
  private projectIdSubject: BehaviorSubject<number>;
  projectId!: number;
  tareaCreada: TareaCreacionDTO[] = [];
  proyecto: ProyectosListado[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private proyectoService: ProyectosService,
    public dialog: MatDialog,
    private tareaService: TareasService
  ) {
    this.projectIdSubject = new BehaviorSubject<number>(0);
    this.projectId$ = this.projectIdSubject.asObservable();
  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.proyectoService.getProyectoId(id)))
      .subscribe((data: any) => {
        this.proyecto.push(data);
        this.proyectoService.projectId = data.id;
        this.projectIdSubject.next(data.id);
      });

    this.getTareas();
  }

  getTareas() {
    this.projectId$.subscribe((projectId) => {
      if (projectId !== 0) {
        this.tareaService.getTareas(projectId).subscribe((data: any) => {
          this.tareaCreada = data;
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.getTareas();
    });
  }
}
