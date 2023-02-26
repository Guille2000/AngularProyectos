import { Component, Input, OnInit } from '@angular/core';
import { Colaborador } from 'src/app/interfaces/interfaces';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TareasService } from 'src/app/services/tareas.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent  implements OnInit {

  constructor(private colaboradoresService:ColaboradoresService,
    private tareasService:TareasService,private proyectoService: ProyectosService,
    ){

  }

  @Input() colaboradoresHijo:Colaborador[] =[]


  ngOnInit(): void {
    this.getColaboradores()
  }

  getColaboradores(){
    this.colaboradoresService.listarColaboradores(this.proyectoService.projectId)
    .subscribe((colaboradores:any) =>{
      this.colaboradoresHijo = colaboradores
    })
  }

  eliminar(id:number){
    this.colaboradoresService.eliminarColaborador(id)
    .subscribe(data =>{
      this.getColaboradores()
    })
  }
}
