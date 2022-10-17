import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { TestMessage } from "rxjs/internal/testing/TestMessage";
import { CheckboxControlValueAccessor } from "@angular/forms";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private route: ActivatedRoute, private router: Router) {}

  string: any;
  cliente: any = "";
  endereco: any = "";
  MascaraRG: any = "00.000.000-0";
  MascaraCPF: any = "000.000.000-00";
  cpf: any = "";
  checked1: boolean = true;
  checked2: boolean = false;
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;
      console.log(this.string);
    });

    await this.api.clientePorCodigo(this.route.snapshot.paramMap.get("codigo")).then((data) => {
      this.cliente = data;
      console.log(this.cliente);
      const tamanho = this.cliente.cpf;
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
    console.log(this.cliente.cep);
    this.api.ObterPorCep(this.cliente.cep).then((data) => {
      this.endereco = data;
      console.log(this.endereco);
      this.cliente.endereco = this.endereco.logradouro;
      this.cliente.bairro = this.endereco.bairro;
      this.cliente.cidade = this.endereco.localidade;
      this.cliente.uf = this.endereco.uf;
    });
  }

  async onSubmit(data: any) {
    data.codigo = this.route.snapshot.paramMap.get("codigo");
    console.log(data);
    if (data.nome == "" || data.fone.length < 14) {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      if (this.checked1 == true) {
        if (data.cpf.length != 14 || data.rg.length != 12) {
          this.toast.error("CPF ou RG estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          data.tipo = "Pessoa Física";
          this.IsDisabled = true;
          await this.api.alterarCliente(data);
          this.startTimer();
          this.toast.success("Cliente Alterado :)");
        }
      } else {
        if (data.cpf.length != 18 || data.rg.length != 15) {
          this.toast.error("CNPJ ou I.E estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          data.tipo = "Pessoa Jurídica";
          this.IsDisabled = true;
          await this.api.alterarCliente(data);
          this.startTimer();
          this.toast.success("Cliente Alterado :)");
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
        this.router.navigate(["/listcliente"]);
      }
    }, 1000);
  }

  verificarCheckbox(registro: any): void {
    if (registro._value == "1") {
      console.log(this.verificarCheckbox);
      this.MascaraCPF = "000.000.000-00";
      this.MascaraRG = "00.000.000-0";
      this.checked1 = true;
      this.checked2 = false;
    } else {
      console.log(document.getElementsByClassName("CPFIN"));
      console.log(this.cpf);
      this.MascaraCPF = "00.000.000/0000-00";
      this.MascaraRG = "000.000.000.000";
      this.checked1 = false;
      this.checked2 = true;
    }
  }
  Verificar(event: any) {}
}
