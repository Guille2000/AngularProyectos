import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  alerta: boolean = false;
  error: boolean = false;
  spinner:boolean = false
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

 

  registerForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  registro() {
    const { email, password } = this.registerForm.value;
    this.spinner = true

    this.auth.registro(email, password).subscribe(
      (data) => {
        this.alerta = true;
        this.spinner = false
        setTimeout(() => {
          this.router.navigate(['auth/login']);
        }, 2000);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error[0].description}`,
        });
      }
    );
  }
}
