import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { of } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Cidade } from '../models/cidade';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: Http) { }

  getEstadosBr(){
    return this.http.get('assets/dados/estadosbr.json')
    .pipe(map(res=>res.json()))
  }

  getCidades(idEstado:number){
    return this.http.get('assets/dados/cidades.json')
    .pipe(map(res=>{
      return JSON.parse(res['_body']).filter(c=>c.estado==idEstado)
    }))
  }

  getCargos(){
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ]
  }

  getTecnologias(){
    return [
      {nome: 'java', desc: 'Java'},
      {nome: 'javascript', desc: 'JavaScript'},
      {nome: 'php', desc: 'PHP'},
      {nome: 'ruby', desc: 'Ruby'}
    ]
  }

  getNewsletter(){
    return [
      {valor: 's', desc: 'Sim'},
      {valor: 'n', desc: 'Não'}
    ]
  }
}
