import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/interfaces/interfaces';
import { ColaboradoresService } from 'src/app/services/colaboradores.service';


@Component({
  selector: 'app-formulario-colaborador',
  templateUrl: './formulario-colaborador.component.html',
  styleUrls: ['./formulario-colaborador.component.scss']
})
export class FormularioColaboradorComponent {
  error:boolean = false
  @Output() colaborador = new EventEmitter<Colaborador>()



  constructor(private colaboradoresService:ColaboradoresService,
    private formBuilder: FormBuilder,
    ){

  }

  buscarForm:FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  })


  buscar(){
    
    const {email} = this.buscarForm.value
    this.colaboradoresService.buscarColaboradores(email)
    .subscribe((data:any) =>{
      this.colaborador.emit(data)
    }, (err) =>{
      this.error = true 
      setTimeout(() =>{
        this.error = false
      }, 4000)
    })
  }

}
