import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProyectosListado } from 'src/app/interfaces/interfaces';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-ver-proyecto',
  templateUrl: './ver-proyecto.component.html',
  styleUrls: ['./ver-proyecto.component.scss']
})
export class VerProyectoComponent implements OnInit{

  proyecto:ProyectosListado[] = []
  constructor(private activatedRoute:ActivatedRoute,
    private proyectoService:ProyectosService){

  }
  ngOnInit(): void {
   this.activatedRoute.params
   .pipe(
    switchMap( ({id}) => this.proyectoService.getProyectoId(id))
   )
   .subscribe((data:any) => {
      this.proyecto.push(data)
   })
  }

}
