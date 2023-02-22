import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
})
export class CrearComponent {
  usuarioId: any | null;
  creado: boolean = false;
  constructor(
    private proyectoService: ProyectosService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.token();
  }

  crearForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required, , Validators.minLength(20)]],
    cliente: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
  });

  crear() {
    const proyecto = {
      usuarioCreacionId: this.usuarioId,
      nombre: this.crearForm.value.nombre,
      descripcion: this.crearForm.value.descripcion,
      cliente: this.crearForm.value.cliente,
      fechaEntrega: this.crearForm.value.fechaEntrega,
    };
    this.proyectoService.crearProyecto(proyecto).subscribe((data) => {
    });
    this.crearForm.reset();
    this.creado = true;
    setTimeout(() => {
      this.creado = false;
    }, 3000);
  }

  token() {
    this.usuarioId = this.tokenService.getIdtoken();
  }
}
