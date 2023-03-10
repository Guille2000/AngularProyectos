import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  spinner: boolean = false;
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    const { email, password } = this.loginForm.value;
    this.spinner = true;
    this.auth.login(email, password).subscribe(
      (data) => {
        this.spinner = false;
        this.router.navigate(['proyectos/dashboard']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.error}`,
        });
        this.spinner = false;
      }
    );
  }
}
