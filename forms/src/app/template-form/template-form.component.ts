import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  constructor(private http: Http) { }

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

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .pipe(map(dados=>dados))
    .subscribe(dados=>console.log(dados))      

    this.emailControlValid=form.controls.email.valid
    this.emailControlTouched=form.controls.email.touched
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

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

          this.resetaDadosForm(formulario)

            this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
            .pipe(map(dados=>dados.json()))
            .subscribe(dados=>this.populaDadosForm(dados, formulario))          

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
