import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";

@Component({
  selector: "app-usuarios-create",
  templateUrl: "./usuarios-create.component.html",
  styleUrls: ["./usuarios-create.component.css"],
})
export class UsuariosCreateComponent implements OnInit {
  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  hide = true;
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem('corBotao');

  ngOnInit(): void {}

  async onSubmit(data: any) {
    data.ativo = true;
    console.log(data);
    if (data.nome == "" || data.senha == "" || data.role == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else if (data.nome.length < 5 || data.senha.length < 5) {
      this.toast.error(
        "O login e senha devem ter no mínimo 5 caracteres",
        "O Cadastro Falhou :("
      );
    } else {
      await this.api.obterString();
      this.IsDisabled = true
      await this.api.salvarUsuario(data);
      this.toast.success("Usuário Cadastrado :)");
      this.startTimer()
    }
  }

  timeLeft: number = 2;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(["/listusers"]);
      }
    },1000)
  }
}
