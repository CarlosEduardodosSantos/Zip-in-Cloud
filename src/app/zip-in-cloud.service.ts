import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ZipInCloudService {
  constructor(public http: HttpClient) {}

  isLogado() {
    if (localStorage.getItem("nome") != null) {
      return true;
    } else {
      return false;
    }
  }

  obterString() {
    return this.http
      .get(environment.url + "Strings/obterString/" + environment.cnpj)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterUsuarios() {
    return this.http
      .get(environment.url + "Usuarios/obterTodos/")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  logar(nome: any, senha: any) {
    return this.http
      .get(`${environment.url}Usuarios/obterLogin/${nome}/${senha}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  usuarioPorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}Usuarios/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarUsuario(data: any) {
    return this.http
      .post(`${environment.url}Usuarios/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarUsuario(data: any) {
    return this.http
      .put(`${environment.url}Usuarios/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  usuarioDelete(codigo: any) {
    return this.http
      .delete(`${environment.url}Usuarios/deletar/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }
  obterFornecs() {
    return this.http
      .get(environment.url + "Fornec/obterTodos/")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  fornecPorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}Fornec/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  fornecDelete(codigo: any) {
    return this.http
      .delete(`${environment.url}Fornec/deletar/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarFornec(data: any) {
    return this.http
      .post(`${environment.url}Fornec/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarFornec(data: any) {
    return this.http
      .put(`${environment.url}Fornec/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterGrupos() {
    return this.http
      .get(environment.url + "Grupo/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  grupoPorCodigo(grupo: any) {
    return this.http
      .get(`${environment.url}Grupo/obterPorGRUPO/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  grupoDelete(grupo: any) {
    return this.http
      .delete(`${environment.url}Grupo/deletar/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarGrupo(data: any) {
    return this.http
      .post(`${environment.url}Grupo/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarGrupo(data: any) {
    return this.http
      .put(`${environment.url}Grupo/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterClientes() {
    return this.http
      .get(environment.url + "Cliente/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  clientePorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}Cliente/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  clienteDelete(grupo: any) {
    return this.http
      .delete(`${environment.url}Cliente/deletar/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarCliente(data: any) {
    return this.http
      .post(`${environment.url}Cliente/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarCliente(data: any) {
    return this.http
      .put(`${environment.url}Cliente/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  ObterPorCep(cep: any) {
    return this.http
      .get(`http://zclub.com.br:35789/api/localizacao/viacep/${cep}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterTipos() {
    return this.http
      .get(environment.url + "TAB_tipo/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterProds() {
    return this.http
      .get(environment.url + "PROD/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  prodPorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}PROD/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarProd(data: any) {
    return this.http
      .post(`${environment.url}PROD/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  prodDelete(grupo: any) {
    return this.http
      .delete(`${environment.url}PROD/deletar/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarProd(data: any) {
    return this.http
      .put(`${environment.url}PROD/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarTema(data: any) {
    return this.http
      .put(`${environment.url}Strings/alterarTema`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  
  obterSecao() {
    return this.http
      .get(environment.url + "Secao/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  secPorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}Secao/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarSec(data: any) {
    return this.http
      .post(`${environment.url}Secao/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  secDelete(grupo: any) {
    return this.http
      .delete(`${environment.url}Secao/deletar/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarSec(data: any) {
    return this.http
      .put(`${environment.url}Secao/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  obterDepto() {
    return this.http
      .get(environment.url + "Depto/obterTodos")
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  deptoPorCodigo(codigo: any) {
    return this.http
      .get(`${environment.url}Depto/obterPorCodigo/${codigo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  salvarDepto(data: any) {
    return this.http
      .post(`${environment.url}Depto/adicionar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  deptoDelete(grupo: any) {
    return this.http
      .delete(`${environment.url}Depto/deletar/${grupo}`)
      .toPromise()
      .then((res) => {
        return res;
      });
  }

  alterarDepto(data: any) {
    return this.http
      .put(`${environment.url}Depto/alterar`, data)
      .toPromise()
      .then((res) => {
        return res;
      });
  }
}
