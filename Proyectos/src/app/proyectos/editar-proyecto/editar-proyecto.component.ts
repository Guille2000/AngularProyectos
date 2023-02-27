import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.scss'],
})
export class EditarProyectoComponent implements OnInit {
  proyectoId: string = '';
  usuarioId: string = '';
  editado: boolean = false;

  constructor(
    private proyectoService: ProyectosService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router
  ) {}

  editarForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required, Validators.minLength(20)]],
    cliente: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.proyectoId = id;
    });
    this.token();
  }

  editar() {
    const proyecto = {
      usuarioCreacionId: this.usuarioId,
      nombre: this.editarForm.value.nombre,
      descripcion: this.editarForm.value.descripcion,
      cliente: this.editarForm.value.cliente,
      fechaEntrega: this.editarForm.value.fechaEntrega,
    };
    this.proyectoService
      .editarProyecto(this.proyectoId, proyecto)
      .subscribe((data) => {
        this.editarForm.reset();
        this.editado = true;
        setTimeout(() => {
          this.editado = false;
        }, 2000);
      });
  }

  eliminar() {
    if (confirm('¿Desea eliminar este proyecto')) {
      this.proyectoService
        .eliminarProyecto(this.proyectoId)
        .subscribe((data) => {
          this.router.navigate(['proyectos/proyectosListado']);
        });
    }
  }

  token() {
    this.usuarioId = this.tokenService.getIdtoken();
  }
}
