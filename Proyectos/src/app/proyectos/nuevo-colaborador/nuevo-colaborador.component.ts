import { Component, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';


@Component({
  selector: 'app-nuevo-colaborador',
  templateUrl: './nuevo-colaborador.component.html',
  styleUrls: ['./nuevo-colaborador.component.scss']
})
export class NuevoColaboradorComponent implements OnInit {

  proyectoId!:number 

  constructor(private colaboradoresService:ColaboradoresService,
    private activatedRoute: ActivatedRoute,
    ){}
  colaborador:Colaborador[] = []  

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.proyectoId = id 
    })
  }


  buscarColaborador(parametros:Colaborador){
    this.colaborador.push(parametros)
  }

  agregarColaborador(email:string){
    this.colaboradoresService.agregarColaborador(this.proyectoId, JSON.stringify(email))
    .subscribe((data:any) => {
      this.colaborador = data 
    }, (err) =>{
      console.log(err)
    })
  }
}
