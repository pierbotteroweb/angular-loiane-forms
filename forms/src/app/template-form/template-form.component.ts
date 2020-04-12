import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  constructor(
    private http: Http,
    private cepService: ConsultaCepService) { }

  usuario: any = {
    nome: null,
    email: null,
    cpf: ''
  }

  emailControlValid:any
  emailControlTouched:any

  onSubmit(formurario){
    console.log(formurario)
    // console.log(this.usuario)

    this.http.post('https://httpbin.org/post', JSON.stringify(formurario.value))
    .pipe(map(dados=>dados))
    .subscribe(dados=>{
      console.log(dados)
      formurario.form.reset()
    })

    this.emailControlValid=formurario.controls.email.valid
    this.emailControlTouched=formurario.controls.email.touched
  }

  verifica(campo){
    return !campo.valid &&campo.touched
  }

  
  // limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
//     document.getElementById('rua').value=("");
//     document.getElementById('bairro').value=("");
//     document.getElementById('cidade').value=("");
//     document.getElementById('uf').value=("");
//     document.getElementById('ibge').value=("");
// }

// meu_callback(conteudo) {
// if (!("erro" in conteudo)) {
//     //Atualiza os campos com os valores.
//     // document.getElementById('rua').value=(conteudo.logradouro);
//     // document.getElementById('bairro').value=(conteudo.bairro);
//     // document.getElementById('cidade').value=(conteudo.localidade);
//     // document.getElementById('uf').value=(conteudo.uf);
//     // document.getElementById('ibge').value=(conteudo.ibge);
// } //end if.
// else {
//     //CEP não Encontrado.
//     this.limpa_formulário_cep();
//     alert("CEP não encontrado.");
// }
// }

  consultaCEP(valor, formulario){
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    
    if (cep != null&&cep != "") {
      this.cepService.consultaCEP(cep)
      // .pipe(map(dados=>dados.json()))
      // .subscribe(dados=>this.populaDadosForm(dados, formulario))
    }
};

populaDadosForm(dados, formulario){
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

  formulario.form.patchValue({
    endereco: {
      rua: dados.logradouro,
      cep: dados.cep,
      numero: '',
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    }
  })
}

resetaDadosForm(formulario){

  formulario.form.patchValue({
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
      'has-error':this.verifica(campo),
      'has-feedback':this.verifica(campo)
    }
  }

  ngOnInit() {
  }

}
