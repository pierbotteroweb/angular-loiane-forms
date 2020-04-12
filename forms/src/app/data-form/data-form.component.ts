import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Http } from "@angular/http";
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { Observable, empty } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  
  // formulario: FormGroup
  estados: Observable <EstadoBr[]>
  cargos:any[]
  tecnologias: any[]
  newsletterOp: any[]
  frameworks:any= ['Angular', 'React', 'Vue', 'Sencha']

  constructor(private formBuilder: FormBuilder,
              private http: Http,
              private dropdownService: DropdownService,
              private cepService: ConsultaCepService,
              private verificaEmailService: VerificaEmailService) {
                super()
               }

  ngOnInit() {

    // this.verificaEmailService.verificarEmail('email@email.com')
    // .subscribe()

    this.estados = this.dropdownService.getEstadosBr()
    this.cargos = this.dropdownService.getCargos()
    this.tecnologias = this.dropdownService.getTecnologias()
    this.newsletterOp = this.dropdownService.getNewsletter()


    // this.dropdownService.getEstadosBr()
    // .subscribe(dados => {
    //   this.estados = dados;
    //   console.log(this.estados)
    // })

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // })

    this.formulario = this.formBuilder.group({
      nome: [null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      // cpf: [null,[Validators.required,Validators.pattern("([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})")]],
      cpf: [null,[Validators.required,FormValidations.cpfValidator]],
      email: [null,[Validators.required,Validators.email],this.validarEmail.bind(this)],
      // confirmaemail: [null,[Validators.required,Validators.email]],
      confirmaemail: [null,[Validators.required,FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        // cep: [null,[Validators.required,Validators.pattern(/^[0-9]{8}$/)]],
        cep: [null,[Validators.required,FormValidations.cepValidator]],
        numero: [null,Validators.required],
        complemento: [null],
        rua: [null,Validators.required],
        bairro: [null,Validators.required],
        cidade: [null,Validators.required],
        estado: [null,Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    })


    // this.formulario.get('endereco.cep').statusChanges
    // .pipe(
    //   distinctUntilChanged(),
    //   tap(status => console.log('status CEP',status))
    // )
    // .subscribe(status => {
    //   if(status ==='VALID'){
    //     this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
    //     .subscribe(dados => this.populaDadosForm(JSON.parse(dados['_body'])))
    //   }
    // })


    this.formulario.get('endereco.cep').statusChanges
    .pipe(
      distinctUntilChanged(),
      tap(status => console.log('status CEP',status)),
      switchMap(status => status ==='VALID' ?
        this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
        : empty()
      )
    )
    .subscribe(dados => dados ? this.populaDadosForm(JSON.parse(dados['_body'])):{})

    
  }

  // requiredMinCheckbox(min=1){
  //   let validator = (formArray: FormArray) =>{
  //     // let values = formArray['controls']
  //     // let totalChecked = 0
  //     // for (let i=0;i<values.length;i++){
  //     //   if(values[i].value){
  //     //     totalChecked +=1
  //     //   }
  //     // }
  //     let totalChecked = formArray['controls']
  //     .map(v=>v.value)
  //     .reduce((total,current)=> current?total+current:total,0)
  //     return totalChecked >= min ? null : {required: true}
  //   }
  //   return validator
  // }

  buildFrameworks(){
    
    let values = this.frameworks.map(v=> new FormControl(false))
    return this.formBuilder.array(values,FormValidations.requiredMinCheckbox(1))

    // this.formBuilder.array( [
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ])

  }
  
  submit() {
    console.log("this.formulario",this.formulario)

    let valueSubmit = Object.assign({}, this.formulario.value);
    console.log('valueSubmit',valueSubmit)

    valueSubmit = Object.assign(valueSubmit,{
      frameworks: valueSubmit.frameworks
      .map((v,i)=> v? this.frameworks[i]:null)
      .filter(v => v!==null)
    })

    console.log(valueSubmit)

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
    .pipe(map(dados=>dados))
    .subscribe(dados=>{
      console.log(dados)
      this.resetar()
    },e=>{
      console.log(e)
    })      
  }


  // consultaCEP(){
  //     //Nova variável "cep" somente com dígitos.

  //     var cep = this.formulario.get('endereco.cep').value

  //     //Verifica se campo cep possui valor informado.
  //     if (cep != null&&cep != "") {
  //       this.cepService.consultaCEP(cep)
  //       .pipe(map(dados=>dados.json()))
  //       .subscribe(dados=>this.populaDadosForm(dados))
  //     }
  // };

  populaDadosForm(dados){
    // formulario.setValue({
    //     nome:formulario.value.nome,
    //     email:formulario.value.email,
    //     cpf:formulario.value.cpf,
    //     endereco: {
    //       rua: dados.logradouro,
    //       cep: dados.cep,
    //       numero: '',
    //       complemento: dados.complemento,
    //       bairro: dados.bairro,
    //       cidade: dados.localidade,
    //       estado: dados.uf
    //     }
    // })

    console.log(dados)

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    this.formulario.get('nome').setValue("Pier - Só pra mostrar que dá pra usar setValue pra um control especifico do form")
  }


  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

  setarCargo(){
    let cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'}
    this.formulario.get('cargo').setValue(cargo)
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel):obj1 === obj2

  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java','javascript','ruby'])
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value)
    .pipe(map(emailExiste => emailExiste? { emailInvalido:true}:null))
  }

}
