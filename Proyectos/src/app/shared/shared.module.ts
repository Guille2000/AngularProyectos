import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { FormularioTareaComponent } from './formulario-tarea/formulario-tarea.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth-interceptor.service';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FormularioTareaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
