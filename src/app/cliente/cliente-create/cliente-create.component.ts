import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { Router } from "@angular/router";
import { MatCalendarCellClassFunction } from "@angular/material/datepicker";
@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"],
})
export class ClienteCreateComponent implements OnInit {
  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router) {}

  endereco: any = "";
  usaCPF: boolean = true;
  MascaraCPF: any = "000.000.000-00";
  MascaraRG: any = "00.000.000-0";
  checked1: boolean = true;
  checked2: boolean = false;
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");
  seq: any;
  atacado: any;
  convenio: any;
  consfinal: any;
  dtnasc: any;

  async ngOnInit() {}

  procurar(event: any) {
    console.log(event.target.value);
    this.api.ObterPorCep(event.target.value).then((data) => {
      this.endereco = data;
      console.log(this.endereco);
    });
  }

  Verificar(event: any) {
    console.log(event.target.value);
  }

  async onSubmit(data: any) {
    await this.api.obterSeq("cliente").then((data) => {
      this.seq = data;
      console.log(this.seq);
    });
    data.codigo = this.seq.sequencia;
    data.ativo = "s";
    data.dtnasc = this.dtnasc;
    data.dtcompra = "2022-10-17T13:16:16.670Z";
    data.atacado = this.verificaCheckbox(this.atacado);
    data.convenio = this.verificaCheckbox(this.convenio);
    data.consfinal = this.consfinal;
    console.log(data);

    if (data.nome == "" || (data.fone1.length != 15 && data.fone1.length != 14)) {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      if (this.checked1 == true) {
        if (data.cic.length != 14 || data.rg.length != 12) {
          this.toast.error("CPF ou RG estão incompletos", "O Cadastro Falhou :(");
          console.log(data.cic.length);
          console.log(data.rg.length);
        } else {
          await this.api.obterString();
          data.tipo = "Pessoa Física";
          this.IsDisabled = true;
          await this.api.salvarCliente(data);
          this.toast.success("Cliente Cadastrado :)");
          this.startTimer();
        }
      } else {
        if (data.cic.length != 18 || data.rg.length < 14) {
          this.toast.error("CNPJ ou I.E estão incompletos", "O Cadastro Falhou :(");
        } else {
          await this.api.obterString();
          data.tipo = "Pessoa Jurídica";
          this.IsDisabled = true;
          await this.api.salvarCliente(data);
          this.toast.success("Cliente Cadastrado :)");
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
        this.router.navigate(["/listcliente"]);
      }
    }, 1000);
  }

  verificarCheckbox(registro: any): void {
    console.log(registro._value);
    if (registro._value == "1") {
      console.log(document.getElementsByClassName("CPFIN"));
      this.MascaraCPF = "000.000.000-00";
      this.MascaraRG = "00.000.000-0";
      this.checked1 = true;
      this.checked2 = false;
    } else {
      console.log(document.getElementsByClassName("CPFIN"));
      this.MascaraCPF = "00.000.000/0000-00";
      this.MascaraRG = "000.000.000.000";
      this.checked1 = false;
      this.checked2 = true;
    }
  }

  verificaCheckbox(check: any) {
    if (check == true) {
      return "s";
    } else {
      return "n";
    }
  }
}
