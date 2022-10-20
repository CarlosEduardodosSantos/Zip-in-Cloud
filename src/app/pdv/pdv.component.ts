import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";
interface carrinho{codigo:any; deS_:any; vlvenda:any; quantidade:any; subtotal:any;}

@Component({
  selector: 'app-pdv',
  templateUrl: './pdv.component.html',
  styleUrls: ['./pdv.component.css']
})
export class PdvComponent implements OnInit {

  constructor(private api: ZipInCloudService, private toast: ToastrService, private _liveAnnouncer: LiveAnnouncer) { }

  string: any;
  produts: any = "";
  grupos: any = "";
  grupo: any = "";
  carrinho: carrinho[] = [];
  DisplayBack: any = "none";
  DisplayCard: any = "none";
  AnimacaoBack: any = "apareceBack 500ms ease-in";
  AnimacaoCard: any = "apareceTexto 500ms ease-in";
  IsDisabled: boolean = false;
  codigoExclu: any = "";
  apareceGrid: any = false;
  total: any = 0.00;
  corBotao = localStorage.getItem("corBotao");

  displayedColumns: string[] = ["codigo", "deS_", "qtdE1", "vlvenda", "ativo", "imagem", "acoes"];
  displayedColumns2: string[] = ["deS_", "vlvenda", "acoes","subtotal","remover"];
  dataSource = new MatTableDataSource(this.produts.results);
  dataSource2 = new MatTableDataSource(this.carrinho);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }

  ApareceCard(Codigo: any) {
    this.DisplayBack = "block";
    this.DisplayCard = "block";
    this.AnimacaoBack = "apareceBack 500ms ease-in";
    this.AnimacaoCard = "apareceTexto 500ms ease-in";
    this.IsDisabled = false;
    this.codigoExclu = Codigo;
    console.log(this.codigoExclu);
  }

  Cancelar() {
    this.AnimacaoBack = "someBack 500ms ease-in";
    this.AnimacaoCard = "someTexto 500ms ease-in";
    this.IsDisabled = true;
    setTimeout(() => {
      this.DisplayBack = "none";
      this.DisplayCard = "none";
    }, 500);
  }


  async ngOnInit() {
    await this.api.obterString().then((data) => {
      this.string = data;

      console.log(this.string);
    });

    const filtroPag = (document.getElementsByClassName("mat-paginator-page-size-label")[0].innerHTML = "Itens por pagina: ");
    console.log(filtroPag);

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
      setTimeout(() => {
        console.log(this.sort);
      }, 500);
    });
  }

  getGrupo(id: any) {
    return this.grupos.results.find((x: any) => x.grupo == id).deS_;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue.trim().toLowerCase() == "")
    {
      this.apareceGrid = false;
    }
    else{
      this.apareceGrid = true;
    }
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase());
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
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

    this.AnimacaoBack = "someBack 500ms ease-in";
    this.AnimacaoCard = "someTexto 500ms ease-in";
    this.IsDisabled = true;
    setTimeout(() => {
      this.DisplayBack = "none";
      this.DisplayCard = "none";
    }, 500);

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

  abrir(data: any, nome: any) {
    var image = new Image();
    image.src = data;

    var w = window.open();
    setTimeout(function () {
      w!.document.title = nome;
    }, 500);
    w!.document.write('<style type="text/css">img{transform: scale(1.3); display: block; margin-left: auto; margin-right: auto; position: absolute;margin: auto;top: 0;left: 0;right: 0;bottom: 0;} ' + 'p{text-align: center; color: white; font-family: Roboto, "Helvetica Neue", sans-serif; margin-top: 30px; font-size: x-large;} ' + "body{background: linear-gradient(180deg, rgba(2, 0, 36, 1) 0%, rgb(215, 173, 2) 0%, rgb(216, 219, 7) 100%);}</style>");
    w!.document.write(`<p>${nome}<p>`);
    w!.document.write(image.outerHTML);
  }

  alimentarCarrinho(codigo: any, desc: any, vlunit: any)
  {
    var objIndex = this.carrinho.findIndex((obj => obj.codigo == codigo));
    console.log(this.carrinho[objIndex]);
    if(this.carrinho[objIndex] == undefined)
    {
    var obj = {codigo: codigo, deS_: desc, vlvenda: vlunit, quantidade: 1, subtotal: vlunit}
    this.carrinho.push(obj);
    this.total += vlunit;
    console.log(this.carrinho);
    this.dataSource2 = new MatTableDataSource(this.carrinho);
    console.log(this.dataSource2);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    this.apareceGrid = false;
    }
    else{
      this.toast.error("Item já adicionado! :(");
    }
  }

  async mudaQuantidade(id: any, qtde: any, operacao:any, vlunit:any)
  {
    var objIndex = this.carrinho.findIndex((obj => obj.codigo == id));
    console.log(this.carrinho[objIndex]);
    if(operacao == 1)
    {
     this.carrinho[objIndex].quantidade = qtde + 1;
     this.carrinho[objIndex].subtotal = (qtde+1) * vlunit;
     this.total += vlunit;
    }
    else if(operacao == 2 && qtde >1){
      this.carrinho[objIndex].quantidade = qtde - 1;
      this.carrinho[objIndex].subtotal = (qtde-1) * vlunit;
      this.total -= vlunit;
    }
    else{
      this.toast.error("A quantidade não pode ser menor que 1! :(");
    }
  }

  deletaCarrinho(id: any, subtotal: any)
  {
    var objIndex = this.carrinho.findIndex((obj => obj.codigo == id));
    if (objIndex !== -1) {
      this.carrinho.splice(objIndex, 1);
      this.total -= subtotal;
      console.log(this.carrinho);
      this.dataSource2 = new MatTableDataSource(this.carrinho);
    }
  }

}
