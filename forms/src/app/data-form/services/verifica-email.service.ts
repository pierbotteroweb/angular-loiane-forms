
import { Injectable } from '@angular/core';
import { map, tap, delay } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VerificaEmailService {

  constructor(private http: Http) { }

  verificarEmail(email: string) {
    return this.http.get('assets/dados/verificarEmail.json')
      .pipe(
        delay(3000),
        map((dados:any) => JSON.parse(dados._body).emails),
        // tap(console.log),
        map((dados:any) => dados.filter(v=>v.email === email)),
        // tap(console.log),
        map((dados:any) => dados.length>0),
        // tap(console.log)
      );
  }
}