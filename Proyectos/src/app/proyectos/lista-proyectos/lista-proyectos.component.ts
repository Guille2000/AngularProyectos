import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import {
  ProyectoCreacionDTO,
  ProyectosListado,
} from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss'],
})
export class ListaProyectosComponent implements OnInit {
  usuarioId: any | null;
  proyectoLista: ProyectosListado[] = [];
  spinner:boolean = false

  constructor(
    private proyectoService: ProyectosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token();
    this.getProyectos();
  }

  token() {
    this.usuarioId = this.tokenService.getIdtoken();
  }
  getProyectos() {
    this.spinner = true 
    this.proyectoService
      .getProyectosId(this.usuarioId)
      .subscribe((data: any) => {
        this.spinner = false 
        this.proyectoLista = data;
        this.proyectoLista = data.map((proyecto: ProyectosListado) => {
          if (proyecto.usuarioCreacionId == this.usuarioId) {
            proyecto.rol = 'Administrador';
          } else {
            proyecto.rol = 'Colaborador';
          }
          return proyecto;
        });
      });
  }
}
