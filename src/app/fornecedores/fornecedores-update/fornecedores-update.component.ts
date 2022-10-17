import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-fornecedores-update",
  templateUrl: "./fornecedores-update.component.html",
  styleUrls: ["./fornecedores-update.component.css"],
})
export class FornecedoresUpdateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) {}

  string: any;
  fornec: any = "";
  endereco: any = "";
  checked1: boolean = true;
  checked2: boolean = false;
  MascaraCPF: any = "000.000.000-00";
  MascaraRG: any = "00.000.000-0";
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    await this.api.fornecPorCodigo(this.route.snapshot.paramMap.get("codigo")).then((data) => {
      this.fornec = data;
      console.log(this.fornec);
      const tamanho = this.fornec.cnpj;
      if (tamanho.length == 14) {
        this.checked1 == true;
        this.checked2 = false;
        this.MascaraCPF = "000.000.000-00";
        this.MascaraRG = "00.000.000-0";
      } else {
        this.MascaraCPF = "00.000.000/0000-00";
        this.MascaraRG = "000.000.000.000";
        this.checked1 = false;
        this.checked2 = true;
      }
    });
  }

  procurar() {
    console.log(this.fornec.cep);
    this.api.ObterPorCep(this.fornec.cep).then((data) => {
      this.endereco = data;
      console.log(this.endereco);
      this.fornec.endereco = this.endereco.logradouro;
      this.fornec.bairro = this.endereco.bairro;
      this.fornec.cidade = this.endereco.localidade;
      this.fornec.uf = this.endereco.uf;
    });
  }

  async onSubmit(data: any) {
    data.codigo = this.route.snapshot.paramMap.get("codigo");
    if (data.ativo == true) {
      data.ativo = "1";
    } else {
      data.ativo = "0";
    }
    console.log(data);
    if (data.nome == "" || data.email == "" || data.endereco == "" || data.cidade == "" || data.fonE1.length < 14 || (data.fonE2.length > 0 && data.fonE2.length < 14)) {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      if (this.checked1 == true) {
        if (data.cnpj.length != 14 || data.ie.length != 12) {
          this.toast.error("CPF ou RG estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          await this.api.alterarFornec(data);
          this.IsDisabled = true;
          data.tipo = "Pessoa Física";
          this.startTimer();
          this.toast.success("Cliente Alterado :)");
        }
      } else {
        if (data.cnpj.length != 18 || data.ie.length != 15) {
          this.toast.error("CNPJ ou I.E estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          await this.api.alterarFornec(data);
          this.IsDisabled = true;
          data.tipo = "Pessoa Jurídica";
          this.toast.success("Fornecedor Alterado :)");
          this.startTimer();
        }
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
        this.router.navigate(["/listfornec"]);
      }
    }, 1000);
  }

  isAtivo(ativo: any) {
    if (ativo == "1" || ativo == "S") return true;
    else return false;
  }
  verificarCheckbox(registro: any): void {
    if (registro._value == "1") {
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
