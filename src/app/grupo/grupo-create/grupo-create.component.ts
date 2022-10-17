import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-grupo-create",
  templateUrl: "./grupo-create.component.html",
  styleUrls: ["./grupo-create.component.css"],
})
export class GrupoCreateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  ngOnInit(): void {}

  async onSubmit(data: any) {
    data.ativo = "1";
    console.log(data);
    if (data.deS_ == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      this.IsDisabled = true;
      await this.api.salvarGrupo(data);
      this.toast.success("Grupo Cadastrado :)");
      this.startTimer();
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
        this.router.navigate(["/listgrupo"]);
      }
    }, 1000);
  }
}
