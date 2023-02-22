import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth-interceptor.service';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
