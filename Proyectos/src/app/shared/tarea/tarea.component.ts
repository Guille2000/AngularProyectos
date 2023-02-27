import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TareaCreacionDTO } from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TareasService } from 'src/app/services/tareas.service';
import { TokenService } from 'src/app/services/token.service';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent implements OnInit {
  @Input() tareasHijo: TareaCreacionDTO[] = [];
  @Input() esAdmin: boolean = false;
  @Output() tareaEliminada = new EventEmitter<boolean>();
  eliminada: boolean = false;
  taskCompleted: boolean = false;
  idToken: string = '';
  email: any = '';

  constructor(
    public dialog: MatDialog,
    private tareaService: TareasService,
    private proyectoService: ProyectosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.tareaService.getTareaSuccess().subscribe((success) => {
      if (success) {
        this.tareaService
          .getTareas(this.proyectoService.projectId)
          .subscribe((tareas: any) => {
            this.tareasHijo = tareas;
          });
        this.tareaService.emitTareaSuccess(false);
      }
    });
  }


  getIdToken() {
    this.idToken = this.tokenService.getIdtoken();
  }
  eliminar(id: number) {
    if (confirm('¿Desea eliminar esta tarea?')) {
      this.tareaService.eliminarTarea(id).subscribe((data) => {
        this.eliminada = true;
        this.tareaEliminada.emit(this.eliminada);
        this.tareaService.emitTareaSuccess(true);
      });
    }
  }

  editar(id: number) {
    this.tareaService.tareaId = id;
    const dialogRef = this.dialog.open(FormularioTareaComponent, {
      width: '500px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.tareaService.tareaId = undefined;
    });
  }
}
