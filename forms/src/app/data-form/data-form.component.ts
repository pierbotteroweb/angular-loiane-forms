import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup

  constructor(private formBuilder: FormBuilder,
              private http: Http) { }

  ngOnInit() {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })

    this.formulario = this.formBuilder.group({
      _nome: [null,Validators.required],
      _cpf: [null,[Validators.required,Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")]],
      _email: [null,[Validators.required,Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null,[Validators.required,Validators.pattern("[0-9]{5}-[0-9]{3}")]],
        numero: [null,Validators.required],
        complemento: [null],
        rua: [null,Validators.required],
        bairro: [null,Validators.required],
        cidade: [null,Validators.required],
        estado: [null,Validators.required]
      })
    })

    
  }

  onSubmit(){
    console.log("this.formulario",this.formulario)
    
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
    .pipe(map(dados=>dados))
    .subscribe(dados=>{
      console.log(dados)
      this.resetar()
    },e=>{
      console.log(e)
    })      

  }

  resetar(){
    this.formulario.reset()
  }

  verificaRequired(campo){
    let campoRequerido = this.formulario.get(campo)
    if(campoRequerido.errors&&campoRequerido.errors.required){
      console.log('campoRequerido errors',campoRequerido.errors.required)
      return campoRequerido.errors.required&&campoRequerido.touched
    }
  }

  verificaEmailValido(){
    let campoEmail = this.formulario.get('_email')
    if(campoEmail.errors){
      // console.log("campoEmail.errors['_email']",campoEmail.errors['_email'])
      return campoEmail.errors['email']&& campoEmail.touched
    }
  }

  verificaCpfValido(){
    let campoCpf = this.formulario.get('_cpf')
    if(campoCpf.errors){
      // console.log("campoCpf.errors['_cpf']",campoCpf.errors['_cpf'])
      return campoCpf.errors['pattern']&& campoCpf.touched
    }
  }

  verificaCepValido(){
    let campoCep = this.formulario.get('endereco.cep')
    if(campoCep.errors){
      // console.log("campoCep.errors['_cpf']",campoCep.errors['_cpf'])
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
