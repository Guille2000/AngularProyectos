import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { CrearComponent } from './crear/crear.component';
import { HomeComponent } from './home/home.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';
import { EditarTareaComponent } from './editar-tarea/editar-tarea.component';
import { CanActivateGuard } from '../auth/can-activate.guard';
import { NuevoColaboradorComponent } from './nuevo-colaborador/nuevo-colaborador.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    canActivate:[CanActivateGuard],
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
        path:'editar/:id',
        component:EditarProyectoComponent
      },
      {
        path:'editarTarea/:id',
        component:EditarTareaComponent
      },
      {
        path:'nuevoColaborador/:id',
        component:NuevoColaboradorComponent
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
