import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
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
      nome: [null],
      email: [null]
    })


  }

  onSubmit(){
    console.log(this.formulario.value)
    
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

}
