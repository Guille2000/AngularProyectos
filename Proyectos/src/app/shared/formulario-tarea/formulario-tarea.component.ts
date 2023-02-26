import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TareasService } from 'src/app/services/tareas.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-formulario-tarea',
  templateUrl: './formulario-tarea.component.html',
  styleUrls: ['./formulario-tarea.component.scss'],
})
export class FormularioTareaComponent implements OnInit {
  proyectoId!: number;
  idTarea: number | undefined;
  usuarioCreacionId: any;


  constructor(
    private formBuilder: FormBuilder,
    private tareasService: TareasService,
    private proyectosService: ProyectosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token();
    this.proyectoId = this.proyectosService.projectId;
    this.idTarea = this.tareasService.tareaId;
  }
  

  crearTarea: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    prioridad: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
  });

  crear() {
    const tarea = {
      usuarioId: this.usuarioCreacionId,
      nombre: this.crearTarea.value.nombre,
      descripcion: this.crearTarea.value.descripcion,
      prioridad: this.crearTarea.value.prioridad,
      fechaEntrega: this.crearTarea.value.fechaEntrega,
    };

    if (this.idTarea) {
      this.tareasService.editarTareas(tarea, this.idTarea).subscribe((data) => {
        this.tareasService.emitTareaSuccess(true);
      });
    } else {
      this.tareasService
        .crearTareas(this.proyectoId, tarea)
        .subscribe(data => {
        })
    }
  }

  token() {
    this.usuarioCreacionId = this.tokenService.getIdtoken();
  }
}