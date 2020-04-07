import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: Http) { }

  getEstadosBr(){
    return this.http.get('assets/dados/estadosbr.json')
    .pipe(map(res=>res.json()))
  }
}
