import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CrearComponent } from './proyectos/crear/crear.component';
import { ErrorComponent } from './utilidades/error/error.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule)
  },
  {
    path:'404',
    component:ErrorComponent
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
