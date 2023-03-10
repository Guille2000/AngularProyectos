import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearComponent } from './crear/crear.component';
import { ListaProyectosComponent } from './lista-proyectos/lista-proyectos.component';
import { ProyectosRotuingModule } from './proyectos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { VerProyectoComponent } from './ver-proyecto/ver-proyecto.component';
import { EditarProyectoComponent } from './editar-proyecto/editar-proyecto.component';

import { NuevoColaboradorComponent } from './nuevo-colaborador/nuevo-colaborador.component';


@NgModule({
  declarations: [
    CrearComponent,
    ListaProyectosComponent,
    HomeComponent,
    ProyectosComponent,
    VerProyectoComponent,
    EditarProyectoComponent,
    NuevoColaboradorComponent
  ],
  imports: [
    CommonModule,
    ProyectosRotuingModule,
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  
})
export class ProyectosModule { }
