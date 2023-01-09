import { environment } from './../../environments/environment';

import { Component, Inject,ViewChild, OnInit } from '@angular/core';
import {MatDialogRef, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { ZipInCloudService } from "src/app/zip-in-cloud.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ConsumoService } from "./../consumo.service";
import { Router } from "@angular/router";
interface carrinho {
  codigo: any;
  deS_: any;
  vlvenda: any;
  quantidade: any;
  subtotal: any;
}

@Component({
  selector: 'app-consumo-modal',
  templateUrl: './consumo-modal.component.html',
  styleUrls: ['./consumo-modal.component.css']
})
export class ConsumoModalComponent implements OnInit {

  dataConsumo: any;
  total: any;
  carrinho: carrinho[] = [];
  mensagem: any = '';
  comprovante: any = true;
  habilitado: any = true;
  displayedColumns2: string[] = [
    "deS_",
    "vlvenda",
    "quantidade",
    "subtotal"
  ];


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }
  dataSource2 = new MatTableDataSource(this.carrinho);
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ConsumoModalComponent>,
  private apiConsumo: ConsumoService,
  private router: Router,
  private api: ZipInCloudService,
  private toast: ToastrService,
  private _liveAnnouncer: LiveAnnouncer) {
    this.dataConsumo = data.consumo
    this.carrinho = data.carrinho
    this.dataSource2 = new MatTableDataSource(this.carrinho);
    this.total = data.total
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.dataSource2 = new MatTableDataSource(this.carrinho);
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    console.log(this.dataConsumo);
    console.log('carrin', this.carrinho);
    console.log('datasource', this.dataSource2);
    
  }

  converterCurrency(valor: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  fechar(){
    this.dialogRef.close();
  }

  async vendaConsumo(){
    console.log(this.total);
    console.log(this.dataConsumo.saldoAtual);
    if(this.total > this.dataConsumo.saldoAtual)
    {
      this.toast.error("Saldo insuficiente! :(");
    }
    else{
      this.habilitado = false;
      let obj: any = 
{
  "restauranteId": environment.resId,
 "numeroCartao": this.dataConsumo.numero,
  "dataMov": new Date(),
   "valor": this.total.toFixed(2),
   "tipoMov": 2,   
   "historico":"Zip in Cloud PDV",
   "usuarioId":0,
   "login":localStorage.getItem("nome"),
   "metodo":0
  }

console.log(obj);
  await this.apiConsumo.inserirMov(obj).then((res) => {
  console.log(res);
 this.mensagem = res;
});

 if(this.mensagem.aproved == true){
 this.toast.success("Venda Realizada com Sucesso! :)");
 this.startTimer();
}
else{
  this.toast.error("A Venda Falhou! :(");
}
  }
}

timeLeft: number = 1;
interval: any;

startTimer() {
  this.interval = setInterval(() => {
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      clearInterval(this.interval);
      this.dialogRef.close({event:'reset'});
    }
  }, 1000);
}
}


    
  


