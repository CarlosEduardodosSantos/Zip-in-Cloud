import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-grupo-update",
  templateUrl: "./grupo-update.component.html",
  styleUrls: ["./grupo-update.component.css"],
})
export class GrupoUpdateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) {}

  string: any;
  grupo: any = "";
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    await this.api.grupoPorCodigo(this.route.snapshot.paramMap.get("grupo")).then((data) => {
      this.grupo = data;
      console.log(this.grupo);
    });
  }

  async onSubmit(data: any) {
    data.grupo = this.route.snapshot.paramMap.get("grupo");
    console.log(data);
    if (data.deS_ == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      this.IsDisabled = true;
      await this.api.alterarGrupo(data);
      this.toast.success("Grupo Alterado :)");
      this.startTimer();
    }
  }

  timeLeft: number = 2;
  interval;

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
