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
        cep: [null,[Validators.required,Validators.pattern(/^[0-9]{8}$/)]],
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
    if(this.formulario.valid){        
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(dados=>dados))
      .subscribe(dados=>{
        console.log(dados)
        this.resetar()
      },e=>{
        console.log(e)
      })      
    } else {
      console.log("formuladio invalido")
      this.verificaValidacoesForm(this.formulario)
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){    
    Object.keys(formGroup.controls).forEach(campo=>{
      console.log(campo)
      let controle = formGroup.get(campo)
      controle.markAsTouched()
      if(controle instanceof FormGroup){
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


  consultaCEP(){
    //Nova variável "cep" somente com dígitos.

    var cep = this.formulario.get('endereco.cep').value

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

          this.resetaDadosForm()

            this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(map(dados=>dados.json()))
            .subscribe(dados=>this.populaDadosForm(dados))          

            //Preenche os campos com "..." enquanto consulta webservice.
            // document.getElementById('rua').value="...";
            // document.getElementById('bairro').value="...";
            // document.getElementById('cidade').value="...";
            // document.getElementById('uf').value="...";
            // document.getElementById('ibge').value="...";

            //Cria um elemento javascript.
            // var script = document.createElement('script');

            //Sincroniza com o callback.
            // script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            // document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            // limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        // limpa_formulário_cep();
    }
};

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

  this.formulario.get('_nome').setValue("Pier - Só pra mostrar que dá pra usar setValue pra um control especifico do form")
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



  aplicaCssErro(campo){
    return {
      'has-error':this.verificaRequired(campo),
      'has-feedback':this.verificaRequired(campo)
    }
  }

}
