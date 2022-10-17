import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-secao-create",
  templateUrl: "./secao-create.component.html",
  styleUrls: ["./secao-create.component.css"],
})
export class SecaoCreateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");
  resultado: any;

  ngOnInit(): void {}

  async onSubmit(data: any) {
    console.log(data);
    if (data.deS_ == "" || data.codigo == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      await this.api.secPorCodigo(data.codigo).then((data) => {
        this.resultado = data;

        console.log(this.resultado);
      });
      if (this.resultado == null) {
        this.IsDisabled = true;
        await this.api.salvarSec(data);
        this.toast.success("Seção Cadastrada :)");
        this.startTimer();
      } else {
        this.toast.error("Uma seção com esse código ja existe", "O Cadastro Falhou :(");
      }
    }
  }

  timeLeft: number = 2;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(["/listsecao"]);
      }
    }, 1000);
  }
}
