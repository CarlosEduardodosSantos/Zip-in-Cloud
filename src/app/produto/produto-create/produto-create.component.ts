import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscriber, timer } from "rxjs";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-produto-create",
  templateUrl: "./produto-create.component.html",
  styleUrls: ["./produto-create.component.css"],
})
export class ProdutoCreateComponent implements OnInit {
  copyright: string = environment.copyright;

  constructor(private api: ZipInCloudService, private toast: ToastrService, private router: Router, public domSanitizer: DomSanitizer) {}

  string: any;
  grupos: any = "";
  tipos: any = "";
  IsDisabled: boolean = false;
  corBotao = localStorage.getItem("corBotao");

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    await this.api.obterGrupos().then((data) => {
      this.grupos = data;

      console.log(this.grupos);
    });

    await this.api.obterTipos().then((data) => {
      this.tipos = data;

      console.log(this.tipos);
    });
  }

  imageBinding =
    "data:image/jpeg;base64,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";

  async onSubmit(data: any) {
    data.ativo = "S";
    data.grupo = data.grupo.toString();
    data.prod_img = data.prod_img.replace(/^data:image\/[A-Za-z-+/]+;base64,/, "");
    console.log(data);
    if (data.vlcusto == "") {
      data.vlcusto = "0";
    }
    if (data.vlentrega == "") {
      data.vlentrega = 0;
    }
    if (data.vlvendA2 == "") {
      data.vlvendA2 = 0;
    }
    if (data.codigo == "" || data.deS_ == "" || data.vlvenda == "" || data.qtdE1 == "" || data.grupo == "" || data.tipo == "" || data.vlcusto == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } else {
      await this.api.obterString();
      this.IsDisabled = true;
      await this.api.salvarProd(data);
      this.toast.success("Produto Cadastrado :)");
      this.startTimer();
    }
  }

  adicionarImagem(data: any) {
    this.toBase64(data.files[0]);
  }

  toBase64(file: File) {
    const obs = new Observable((sub: Subscriber<any>) => {
      this.readFile(file, sub);
    });
    obs.subscribe((d) => {
      this.imageBinding = d;
    });
  }

  timeLeft: number = 2;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(["/listproduto"]);
      }
    }, 1000);
  }

  readFile(file: File, sub: Subscriber<any>) {
    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload = () => {
      sub.next(filereader.result);
      sub.complete();
    };
    filereader.onerror = (err: any) => {
      sub.error(err);
      sub.complete();
    };
  }
  async abrir(data: any) {
    var image = new Image();
    image.src = data;

    var w = window.open();
    w!.document.write('<style type="text/css">img{transform: scale(1.3); display: block; margin-left: auto; margin-right: auto; position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;} ' + "body{background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgb(215, 173, 2) 0%, rgb(216, 219, 7) 100%);}</style>");
    w!.document.write(image.outerHTML);
  }
}
