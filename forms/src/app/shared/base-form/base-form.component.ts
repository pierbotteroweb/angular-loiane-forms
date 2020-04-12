import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<br>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup

  constructor() { }

  ngOnInit() {
  }

  abstract submit()

  onSubmit() {
    if(this.formulario.valid){
      this.submit()
    } else {
      console.log("formuladio invalido")
      this.verificaValidacoesForm(this.formulario)
    }
  }

  
  verificaValidacoesForm(formGroup: FormGroup | FormArray){    
    Object.keys(formGroup.controls).forEach(campo=>{
      console.log(campo)
      let controle = formGroup.get(campo)
      controle.markAsDirty()
      controle.markAsTouched()
      if(controle instanceof FormGroup || controle instanceof FormArray){
        this.verificaValidacoesForm(controle)
      }
    })
  }

  resetar(){
    this.formulario.reset()
  }

  verificaRequired(campo){
    let campoRequerido = this.formulario.get(campo)
    if(campoRequerido.errors&&campoRequerido.errors.required){
      return campoRequerido.errors.required&&campoRequerido.touched
    }
  }

  verificaEmailValido(){
    let campoEmail = this.formulario.get('email')
    if(campoEmail.errors){
      // console.log("campoEmail.errors['email']",campoEmail.errors['email'])
      return campoEmail.errors['email']&& campoEmail.touched
    }
  }

  verificaCpfValido(){
    let campoCpf = this.formulario.get('cpf')
    if(campoCpf.errors){
      // console.log("campoCpf.errors['cpf']",campoCpf.errors['cpf'])
      return campoCpf.errors['pattern']&& campoCpf.touched
    }
  }

  verificaChecked(){
    let campoTermos = this.formulario.get('termos')
    if(campoTermos.errors){
      // console.log("campoTermos.errors['cpf']",campoTermos.errors['cpf'])
      return campoTermos.errors['pattern']&& campoTermos.touched
    }
  }

  verificaCepValido(){
    let campoCep = this.formulario.get('endereco.cep')
    if(campoCep.errors){
      // console.log("campoCep.errors['cpf']",campoCep.errors['cpf'])
      return campoCep.errors['pattern']&& campoCep.touched
    }
  }

  aplicaCssErro(campo){
    return {
      'has-error':this.verificaRequired(campo),
      'has-feedback':this.verificaRequired(campo)
    }
  }


}
