import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import {
  Colaborador,
  ProyectosListado,
  TareaCreacionDTO,
} from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormularioTareaComponent } from 'src/app/shared/formulario-tarea/formulario-tarea.component';
import { TareasService } from 'src/app/services/tareas.service';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss'],
})
export class VerProyectoComponent implements OnInit {
  projectId$: Observable<number>;
  private projectIdSubject: BehaviorSubject<number>;
  private usuarioCreacionIdSubject: BehaviorSubject<any>;
  usuarioCreacionId$: Observable<any>;
  projectId!: number;
  tareaCreada: TareaCreacionDTO[] = [];
  proyecto: ProyectosListado[] = [];
  colaboradores: Colaborador[] = [];
  eliminado: boolean = false;
  idToken: any;
  usuarionCreacionId: any;
  esAdmin: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private colaboradoresService: ColaboradoresService,
    private proyectoService: ProyectosService,
    public dialog: MatDialog,
    private tareaService: TareasService,
    private tokenService: TokenService
  ) {
    this.projectIdSubject = new BehaviorSubject<number>(0);
    this.projectId$ = this.projectIdSubject.asObservable();

    this.usuarioCreacionIdSubject = new BehaviorSubject<number>(0);
    this.usuarioCreacionId$ = this.usuarioCreacionIdSubject.asObservable();
  }
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.proyectoService.getProyectoId(id)))
      .subscribe((data: any) => {
        this.proyecto.push(data);
        this.proyectoService.projectId = data.id;
        this.projectIdSubject.next(data.id);

        this.usuarionCreacionId =
          this.proyecto.length > 0 ? this.proyecto[0].usuarioCreacionId : null;
        this.proyectoService.usuarionCreacionId = this.usuarionCreacionId;
        this.usuarioCreacionIdSubject.next(
          this.proyectoService.usuarionCreacionId
        );

        this.getTareas();

        this.usuarioCreacionId$.subscribe((usuarionCreacionId) => {
          if (usuarionCreacionId == this.idToken){
            this.esAdmin = true 
          } else {
            this.esAdmin = false 
          }
        });
      });

    this.getColaboradores();
    this.getIdToken();
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

  getColaboradores() {
    this.projectId$.subscribe((projectId) => {
      if (projectId !== 0) {
        this.colaboradoresService
          .listarColaboradores(projectId)
          .subscribe((data: any) => {
            this.colaboradores = data;
          });
      }
    });
  }

  getIdToken() {
    this.idToken = this.tokenService.getIdtoken();

    this.usuarioCreacionIdSubject.next(this.idToken);
  }

  colaboradorEliminado(data: boolean) {
    this.eliminado = data;

    setTimeout(() => {
      this.eliminado = false;
    }, 2000);
  }

  openDialog() {
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        this.getTareas();
      }
    });
  }
}
