import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ZipInCloudService } from "../zip-in-cloud.service";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.css"],
})
export class ConfigComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private router: Router, private toast: ToastrService) {}

  corBotao = localStorage.getItem("corBotao");
  tema: any;
  string: any;

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;
      this.tema = this.string.tema;

      console.log(this.tema);
    });
  }

  async onSubmit(data: any) {
    data.cnpj = environment.cnpj;
    data.tema = this.tema;
    console.log(data);
    this.definirTema();
    await this.api.alterarTema(data);
    this.toast.success("Preferências Alteradas :)");
    this.startTimer();
  }

  timeLeft: number = 2;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        location.reload();
      }
    }, 500);
  }

  selecionarTema(id: any) {
    this.tema = id;
    console.log(id);
  }

  definirTema() {
    if (this.tema == 1) {
      localStorage.setItem("corLogin", "180deg, #Ffc000, #aa8000");
      localStorage.setItem("corMenu", "180deg, #Ffc000, #aa8000");
      localStorage.setItem("corBotao", "#484848");
      localStorage.setItem("corIcone", "#Ffc000");
      localStorage.setItem("corFundo", "#fff9e6");
    } else if (this.tema == 2) {
      localStorage.setItem("corLogin", "180deg, #00B0FF, #2F2E41");
      localStorage.setItem("corMenu", "180deg, #00B0FF, #2F2E41");
      localStorage.setItem("corBotao", "#2F2E41");
      localStorage.setItem("corIcone", "#2F2E41");
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

  checa(id: any) {
    if (id == this.tema) {
      return true;
    } else {
      return false;
    }
  }
}
