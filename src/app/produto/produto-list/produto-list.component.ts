import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.css']
})
export class ProdutoListComponent implements OnInit {

  constructor(private api: ZipInCloudService, private toast: ToastrService, private _liveAnnouncer: LiveAnnouncer) { }

  string: any;
  produts: any = "";
  grupos: any = "";
  grupo: any = "";
  DisplayBack: any = "none";
  DisplayCard: any = "none";
  AnimacaoBack: any = "apareceBack 500ms ease-in";
  AnimacaoCard: any = "apareceTexto 500ms ease-in";
  IsDisabled: boolean = false;
  codigoExclu: any = "";
  corBotao = localStorage.getItem('corBotao');

  displayedColumns: string[] = [
    "codigo",
    "deS_",
    "qtdE1",
    "vlvenda",
    "ativo",
    "imagem",
    "acoes"
  ];
  dataSource = new MatTableDataSource(this.produts.results);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}

ApareceCard(Codigo:any) {
  this.DisplayBack = "block";
  this.DisplayCard = "block"
  this.AnimacaoBack = "apareceBack 500ms ease-in"
  this.AnimacaoCard = "apareceTexto 500ms ease-in"
  this.IsDisabled = false;
  this.codigoExclu = Codigo
  console.log(this.codigoExclu)
}

Cancelar() {
  this.AnimacaoBack = "someBack 500ms ease-in"
  this.AnimacaoCard = "someTexto 500ms ease-in"
  this.IsDisabled = true;
  setTimeout(() => {
    this.DisplayBack = "none";
    this.DisplayCard = "none";
  }, 500)
}

  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    const filtroPag = document.getElementsByClassName("mat-paginator-page-size-label")[0].innerHTML = "Itens por pagina: "
    console.log(filtroPag)
    

    await this.api.obterGrupos().then((data) => {
      this.grupos = data;

      console.log(this.grupos);
    });


    await this.api.obterProds().then((data) => {
      this.produts = data;

      console.log(this.produts);
      console.log(this.produts);
      this.dataSource = new MatTableDataSource(this.produts.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      setTimeout(() => {console.log(this.sort)}, 500)
    });
  }

   getGrupo(id: any){
    return this.grupos.results.find(x=>x.grupo == id).deS_;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }

  isAtivo(ativo: any) {
    if (ativo == "1" || ativo == "S") return true;
    else return false;
  }

  async deletar(codigo: any) {
    await this.api.obterString();
    await this.api.prodDelete(codigo);
    await this.toast.success("Produto Deletado :)");

    this.AnimacaoBack = "someBack 500ms ease-in"
    this.AnimacaoCard = "someTexto 500ms ease-in"
    this.IsDisabled = true;
    setTimeout(() => {
      this.DisplayBack = "none";
      this.DisplayCard = "none";
    }, 500)

    await this.api.obterProds().then((data) => {
      this.produts = data;

      console.log(this.produts);
      console.log(this.dataSource);
      this.dataSource = new MatTableDataSource(this.produts.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  abrir(data, nome) {
    var image = new Image();
    image.src = data;

    var w = window.open();
    setTimeout(function () {
      w.document.title = nome;
    }, 500);
    w.document.write(
      '<style type="text/css">img{transform: scale(1.3); display: block; margin-left: auto; margin-right: auto; position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;} ' + 
      'p{text-align: center; color: white; font-family: Roboto, "Helvetica Neue", sans-serif; margin-top: 30px; font-size: x-large;} ' +
      'body{background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgb(215, 173, 2) 0%, rgb(216, 219, 7) 100%);}</style>'
    );
    w.document.write(`<p>${nome}<p>`);
    w.document.write(image.outerHTML);
  }
}
