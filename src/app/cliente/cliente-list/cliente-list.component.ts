import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: "app-cliente-list",
  templateUrl: "./cliente-list.component.html",
  styleUrls: ["./cliente-list.component.css"],
})
export class ClienteListComponent implements OnInit {
  constructor(private api: ZipInCloudService, private toast: ToastrService, private _liveAnnouncer: LiveAnnouncer) {}

  string: any;
  clientes: any = "";
  DisplayBack: any = "none";
  DisplayCard: any = "none";
  AnimacaoBack: any = "apareceBack 500ms ease-in";
  AnimacaoCard: any = "apareceTexto 500ms ease-in";
  IsDisabled: boolean = false;
  codigoExclu: any = "";
  corBotao = localStorage.getItem("corBotao");

  displayedColumns: string[] = ["codigo", "nome", "cic", "rg", "fone1", "ativo", "acoes"];
  dataSource = new MatTableDataSource(this.clientes.results);
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

    await this.api.obterClientes().then((data) => {
      this.clientes = data;

      console.log(this.clientes);
      console.log(this.clientes);
      this.dataSource = new MatTableDataSource(this.clientes.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deletar(codigo: any) {
    await this.api.obterString();
    await this.api.clienteDelete(codigo);
    await this.toast.success("Cliente Deletado :)");

    this.AnimacaoBack = "someBack 500ms ease-in";
    this.AnimacaoCard = "someTexto 500ms ease-in";
    this.IsDisabled = true;
    setTimeout(() => {
      this.DisplayBack = "none";
      this.DisplayCard = "none";
    }, 500);

    await this.api.obterClientes().then((data) => {
      this.clientes = data;

      console.log(this.clientes);
      console.log(this.dataSource);
      this.dataSource = new MatTableDataSource(this.clientes.results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
}
