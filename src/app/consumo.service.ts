import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor(public http: HttpClient) { }

  obterPorNumero(numero: any) {
    return this.http
      .get(`${environment.consumoUrl}CartaoConsumo/obterByConsuNr/${environment.resId}/${numero}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  async inserirMov(data: any) {
    return this.http
      .post(`${environment.consumoUrl}CartaoConsumo/adicionarMov`, data)
      .toPromise()
      .then((res) => {
         return res;
      });
  }
}
