import { Component, OnInit } from '@angular/core';
import { ProyectosService } from 'src/app/services/proyectos.service';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ProyectoCreacionDTO, ProyectosListado } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-lista-proyectos',
  templateUrl: './lista-proyectos.component.html',
  styleUrls: ['./lista-proyectos.component.scss'],
})
export class ListaProyectosComponent implements OnInit {
  usuarioId: any | null;
  proyectoLista:ProyectosListado[] = []
  constructor(
    private proyectoService: ProyectosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.token();
    this.getProyectos()
  }

  token() {
    this.usuarioId = this.tokenService.getIdtoken();
  }
  getProyectos(){
    this.proyectoService
    .getProyectosId(this.usuarioId)
    .subscribe((data:any) => {
      this.proyectoLista = data 
      console.log(this.proyectoLista)
    })
  }
}
