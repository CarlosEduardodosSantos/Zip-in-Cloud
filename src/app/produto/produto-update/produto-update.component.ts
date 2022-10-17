import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscriber } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-produto-update',
  templateUrl: './produto-update.component.html',
  styleUrls: ['./produto-update.component.css']
})
export class ProdutoUpdateComponent implements OnInit {

  constructor(private api: ZipInCloudService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private domSanitizer: DomSanitizer) { }

    string: any;
    produto: any = "";
    grupos: any = "";
    _grupo: any = "";
    _tipo: any ="";
    tipos: any = "";
    imageBinding = '../../../assets/semimagem.jpg';
    IsDisabled: boolean = false;
    corBotao = localStorage.getItem('corBotao');

    
    async ngOnInit() {
      await this.api.obterString().then((data) => {
        this.string = data;
  
        console.log(this.string);
      });
      
  
      await this.api
        .prodPorCodigo(this.route.snapshot.paramMap.get("codigo"))
        .then((data) => {
          this.produto = data;
          console.log(this.produto);
        });

    await this.api.obterGrupos().then((data) => {
      this.grupos = data;
      this._grupo = Number(this.produto.grupo);

      console.log(this._grupo);
    });

    await this.api.obterTipos().then((data) => {
      this.tipos = data;
      this._tipo = this.produto.tipo;

      console.log(this.tipos);
    });
  }

  async onSubmit(data: any) {
    data.codigo = this.route.snapshot.paramMap.get("codigo");
    if (data.ativo == true) {
      data.ativo = "S";
    } else {
      data.ativo = "N";
    }
    data.grupo = data.grupo.toString();
    data.prod_img = data.prod_img.replace(/^data:image\/[A-Za-z-+/]+;base64,/, '');
    console.log(data);
    if (data.deS_ == "") {
      this.toast.error("Insira todos os dados", "O Cadastro Falhou :(");
    } 
    else 
    {
      await this.api.obterString();
      this.IsDisabled = true
      await this.api.alterarProd(data);
      this.startTimer()
      this.toast.success("Produto Alterado :)");
    }
  }

  
  async adicionarImagem(data: any) {
    this.toBase64(data.files[0]);
  }

  

  toBase64(file: File) {
    
    const obs = new Observable((sub: Subscriber<any>) => {
      this.readFile(file, sub);
    });
    
    obs.subscribe((d) => {
      d = d.replace(/^data:image\/[A-Za-z-+/]+;base64,/, '');
      this.imageBinding = d;
      this.produto.prod_img = d;
    });
  }  

  timeLeft: number = 2;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.router.navigate(["/listproduto"]);
      }
    },1000)
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

  isAtivo(ativo: any) {
    if (ativo == "1" || ativo == "S") return true;
    else return false;
  }

  async abrir(data) {
    var image = new Image();
    image.src = data;
    const nome = this.produto.deS_;

    var w = window.open();

    setTimeout(function () {
      w.document.title = nome;
      console.log(nome);
    }, 500);
    w.document.write(
      '<style type="text/css">img{transform: scale(1.3); display: block; margin-left: auto; margin-right: auto; position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;} ' + 
      'p{text-align: center; color: white; font-family: Roboto, "Helvetica Neue", sans-serif; margin-top: 30px; font-size: x-large;} ' +
      'body{background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgb(215, 173, 2) 0%, rgb(216, 219, 7) 100%);}</style>'
    );
    w.document.write(`<p>${this.produto.deS_}<p>`);
    w.document.write(image.outerHTML);
  }
}
