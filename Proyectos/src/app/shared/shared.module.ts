import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';
import { TareaComponent } from './tarea/tarea.component';
import { FormularioColaboradorComponent } from './formulario-colaborador/formulario-colaborador.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FormularioTareaComponent,
    TareaComponent,
    FormularioColaboradorComponent,
    ColaboradoresComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    TareaComponent,
    FormularioColaboradorComponent,
    ColaboradoresComponent,
    MatProgressSpinnerModule

  ]
})
export class SharedModule { }
