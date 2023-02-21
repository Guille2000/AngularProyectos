import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { CrearComponent } from './crear/crear.component';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'proyectosListado',
        component:ListaProyectosComponent
      },
      {
        path:'crear',
        component:CrearComponent
      },
      {
        path:'dashboard',
        component:ProyectosComponent
      },
      {
        path:':id',
        component:VerProyectoComponent
      },
      {
        path:'**',
        redirectTo:'dashboard'
      }
    ]
  }]



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectosRotuingModule { }
