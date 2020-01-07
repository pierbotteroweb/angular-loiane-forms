import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    cpf: ''
  }

  emailControlValid:any
  emailControlTouched:any

  onSubmit(form){
    console.log(form)
    // console.log(this.usuario)

    this.emailControlValid=form.controls.email.valid
    this.emailControlTouched=form.controls.email.touched
  }

  verifica(campo){
    return !campo.valid &&campo.touched
  }

  aplicaCssErro(campo){
    return {
      'has-error':this.verifica(campo),
      'has-feedback':this.verifica(campo)
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
