import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';

@Component({
  selector: 'app-nuevo-colaborador',
  templateUrl: './nuevo-colaborador.component.html',
  styleUrls: ['./nuevo-colaborador.component.scss'],
})
export class NuevoColaboradorComponent implements OnInit {
  proyectoId!: number;
  colaborador: Colaborador[] = [];
  mensajeError: string | undefined;
  mensajeExito: boolean | undefined;

  constructor(
    private colaboradoresService: ColaboradoresService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.proyectoId = id;
    });
  }

  buscarColaborador(parametros: any) {
    this.colaborador.push(parametros);
    console.log(parametros);
    console.log(this.colaborador);
  }

  agregarColaborador(email: string) {
    this.colaboradoresService
      .agregarColaborador(this.proyectoId, JSON.stringify(email))
      .subscribe(
        (data: any) => {
          this.colaborador = data;
          this.mensajeExito = true;
          setTimeout(() => {
            this.mensajeExito = false;
            this.router.navigate(['/proyectos/', this.proyectoId]);
          }, 2000);
        },
        (err) => {
          console.log(err.error);
          this.mensajeError = err.error;
          setTimeout(() => {
            this.mensajeError = undefined;
          }, 3500);
        }
      );
  }
}
