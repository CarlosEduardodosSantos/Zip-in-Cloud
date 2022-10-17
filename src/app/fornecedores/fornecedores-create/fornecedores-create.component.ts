import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-fornecedores-create",
  templateUrl: "./fornecedores-create.component.html",
  styleUrls: ["./fornecedores-create.component.css"],
})
export class FornecedoresCreateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  endereco: any = "";
  checked1: boolean = true;
  checked2: boolean = false;
  MascaraCPF: any = "000.000.000-00";
  MascaraRG: any = "00.000.000-0";
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  ngOnInit(): void {}

  procurar(event: any) {
    console.log(event.target.value);
    this.api.ObterPorCep(event.target.value).then((data) => {
      this.endereco = data;
      console.log(this.endereco);
    });
  }

  async onSubmit(data: any) {
    data.ativo = "1";
    console.log(data);
    if (data.nome == "" || data.email == "" || data.endereco == "" || data.cidade == "" || data.fonE1.length < 14 || (data.fonE2.length > 0 && data.fonE2.length < 14)) {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      if (this.checked1 == true) {
        if (data.cnpj.length != 14 || data.ie.length != 12) {
          this.toast.error("CPF ou RG estão incompletos", "O Cadastro Falhou :(");
          console.log(data.cpf.length);
          console.log(data.rg.length);
        } else {
          await this.api.obterString();
          data.tipo = "Pessoa Física";
          await this.api.salvarFornec(data);
          this.IsDisabled = true;
          data.tipo = "Pessoa Física";
          this.toast.success("Cliente Cadastrado :)");
          this.startTimer();
        }
      } else {
        if (data.cnpj.length != 18 || data.ie.length < 14) {
          this.toast.error("CNPJ ou I.E estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          await this.api.salvarFornec(data);
          this.IsDisabled = true;
          data.tipo = "Pessoa Jurídica";
          this.toast.success("Fornecedor Cadastrado :)");
          this.startTimer();
        }
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
        this.router.navigate(["/listfornec"]);
      }
    }, 1000);
  }
  verificarCheckbox(registro: any): void {
    if (registro._value == "1") {
      console.log(this.verificarCheckbox);
      this.checked1 = true;
      this.checked2 = false;
      this.MascaraCPF = "000.000.000-00";
      this.MascaraRG = "00.000.000-0";
    } else {
      this.checked1 = false;
      this.checked2 = true;
      this.MascaraCPF = "00.000.000/0000-00";
      this.MascaraRG = "000.000.000.000";
    }
  }
}
