import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-depto-update",
  templateUrl: "./depto-update.component.html",
  styleUrls: ["./depto-update.component.css"],
})
export class DeptoUpdateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) {}

  string: any;
  depto: any = "";
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    await this.api.deptoPorCodigo(this.route.snapshot.paramMap.get("codigo")).then((data) => {
      this.depto = data;
      console.log(this.depto);
    });
  }

  async onSubmit(data: any) {
    data.codigo = this.route.snapshot.paramMap.get("codigo");
    console.log(data);
    if (data.des_ == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      this.IsDisabled = true;
      await this.api.alterarDepto(data);
      this.toast.success("Secao Alterada :)");
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
        this.router.navigate(["/listdepto"]);
      }
    }, 1000);
  }
}
