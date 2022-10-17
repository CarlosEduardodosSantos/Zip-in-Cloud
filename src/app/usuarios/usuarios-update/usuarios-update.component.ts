import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-usuarios-update",
  templateUrl: "./usuarios-update.component.html",
  styleUrls: ["./usuarios-update.component.css"],
})
export class UsuariosUpdateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) {}

  string: any;
  usuario: any = "";
  hide = true;
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    await this.api.usuarioPorCodigo(this.route.snapshot.paramMap.get("codigo")).then((data) => {
      this.usuario = data;
      console.log(this.usuario);
    });
  }

  async onSubmit(data: any) {
    data.codigo = this.route.snapshot.paramMap.get("codigo");
    console.log(data);
    if (data.nome == "" || data.senha == "" || data.role == "") {
      this.toast.error("Insira todos os dados", "A Alteração falhou Falhou :(");
    } else if (data.nome.length < 5 || data.senha.length < 5) {
      this.toast.error("O login e senha devem ter no mínimo 5 caracteres", "A Alteração Falhou :(");
    } else {
      await this.api.obterString();
      this.IsDisabled = true;
      await this.api.alterarUsuario(data);
      this.toast.success("Usuário Atualizado :)");
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
        this.router.navigate(["/listusers"]);
      }
    }, 1000);
  }
}
