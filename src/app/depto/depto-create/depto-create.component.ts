import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-depto-create",
  templateUrl: "./depto-create.component.html",
  styleUrls: ["./depto-create.component.css"],
})
export class DeptoCreateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");
  resultado: any;

  ngOnInit(): void {}

  async onSubmit(data: any) {
    console.log(data);
    if (data.des_ == "" || data.codigo == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      await this.api.deptoPorCodigo(data.codigo).then((data) => {
        this.resultado = data;

        console.log(this.resultado);
      });
      if (this.resultado == null) {
        this.IsDisabled = true;
        await this.api.salvarDepto(data);
        this.toast.success("Departamento Cadastrado :)");
        this.startTimer();
      } else {
        this.toast.error("Um departamento com esse código ja existe", "O Cadastro Falhou :(");
      }
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
        this.router.navigate(["/listdepto"]);
      }
    }, 1000);
  }
}
