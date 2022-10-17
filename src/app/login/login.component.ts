import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "../zip-in-cloud.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private api: ZipInCloudService, private router: Router, private toast: ToastrService) {}

  string: any;
  usuario: any;
  tema: any;
  stringa: any;
  corLogin = localStorage.getItem('corLogin');
  corBotao = localStorage.getItem('corBotao');

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.stringa = data  });
      this.tema = this.stringa.tema;      
    this.definirTema();
    console.log(this.corLogin);
  }

  async logar(nome: any, senha: any) {
    if (nome == "" || senha == "") {
      this.toast.error("Preencha todos os campos");
    } else {
      await this.api.obterString().then((data) => {
        this.string = data;

        console.log(this.string);
      });

      await this.api.logar(nome, senha).then((data) => {
        this.usuario = data;

        console.log(this.usuario);
        if (this.usuario != null) {
          localStorage.setItem("nome", this.usuario.nome);
          localStorage.setItem("senha", this.usuario.senha);
          localStorage.setItem("role", this.usuario.role);
          this.router.navigate(["/home"]);
        } else {
          this.toast.error("Usuário ou Senha inválidos", "O Login Falhou :(");
        }
      });
    }
  } 

  definirTema(){
    if (this.tema == 1) {
      localStorage.setItem("corLogin", "180deg, #Ffc000, #aa8000");
      localStorage.setItem("corMenu", "180deg, #Ffc000, #aa8000");
      localStorage.setItem("corBotao", "#484848");
      localStorage.setItem("corIcone", "#Ffc000");
      localStorage.setItem("corFundo", "#fff9e6");
    } else if (this.tema == 2) {
      localStorage.setItem("corLogin", "180deg, #cbcbcb, #8e8e8e");
      localStorage.setItem("corMenu", "180deg, #cbcbcb, #8e8e8e");
      localStorage.setItem("corBotao", "#666666");
      localStorage.setItem("corIcone", "#cbcbcb");
      localStorage.setItem("corFundo", "#fafafa");
    } else if (this.tema == 3) {
      localStorage.setItem("corLogin", "180deg, #2b2b2b, #141414");
      localStorage.setItem("corMenu", "180deg, #2b2b2b, #141414");
      localStorage.setItem("corBotao", "#b9b9b9");
      localStorage.setItem("corIcone", "#141414");
      localStorage.setItem("corFundo", "#2c2c2c");
    } else if (this.tema == 4) {
      localStorage.setItem("corLogin", "180deg, #7858a6, #8669af");
      localStorage.setItem("corMenu", "180deg, #7858a6, #8669af");
      localStorage.setItem("corBotao", "#7858A6");
      localStorage.setItem("corIcone", "#8669af");
      localStorage.setItem("corFundo", "#f2eef6");
    } else {
      localStorage.setItem("corLogin", "180deg, #246c5c, #50897d");
      localStorage.setItem("corMenu", "180deg, #246c5c, #50897d");
      localStorage.setItem("corBotao", "#B73E3E");
      localStorage.setItem("corIcone", "#50897d");
      localStorage.setItem("corFundo", "#FAFAFA");
    }
  }
}
