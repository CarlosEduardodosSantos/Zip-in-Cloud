import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NavComponent } from "./nav/nav.component";
import { HomeComponent } from "./home/home.component";
import { UsuariosListComponent } from "./usuarios/usuarios-list/usuarios-list.component";
import { AuthGuard } from "./auth.guard";
import { UsuariosCreateComponent } from "./usuarios/usuarios-create/usuarios-create.component";
import { UsuariosUpdateComponent } from "./usuarios/usuarios-update/usuarios-update.component";
import { FornecedoresListComponent } from "./fornecedores/fornecedores-list/fornecedores-list.component";
import { FornecedoresCreateComponent } from "./fornecedores/fornecedores-create/fornecedores-create.component";
import { FornecedoresUpdateComponent } from "./fornecedores/fornecedores-update/fornecedores-update.component";
import { GrupoListComponent } from "./grupo/grupo-list/grupo-list.component";
import { GrupoCreateComponent } from "./grupo/grupo-create/grupo-create.component";
import { GrupoUpdateComponent } from "./grupo/grupo-update/grupo-update.component";
import { ClienteListComponent } from "./cliente/cliente-list/cliente-list.component";
import { ClienteCreateComponent } from "./cliente/cliente-create/cliente-create.component";
import { ClienteUpdateComponent } from "./cliente/cliente-update/cliente-update.component";
import { ProdutoListComponent } from "./produto/produto-list/produto-list.component";
import { ProdutoCreateComponent } from "./produto/produto-create/produto-create.component";
import { ProdutoUpdateComponent } from "./produto/produto-update/produto-update.component";
import { ConfigComponent } from "./config/config.component";
import { SecaoListComponent } from "./secao/secao-list/secao-list.component";
import { SecaoCreateComponent } from "./secao/secao-create/secao-create.component";
import { SecaoUpdateComponent } from "./secao/secao-update/secao-update.component";
import { DeptoListComponent } from "./depto/depto-list/depto-list.component";
import { DeptoCreateComponent } from "./depto/depto-create/depto-create.component";
import { DeptoUpdateComponent } from "./depto/depto-update/depto-update.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "",
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "home", component: HomeComponent },
      { path: "listusers", component: UsuariosListComponent },
      { path: "createusers", component: UsuariosCreateComponent },
      { path: "updateusers/:codigo", component: UsuariosUpdateComponent },
      { path: "listfornec", component: FornecedoresListComponent },
      { path: "createfornec", component: FornecedoresCreateComponent },
      { path: "updatefornec/:codigo", component: FornecedoresUpdateComponent },
      { path: "listgrupo", component: GrupoListComponent },
      { path: "creategrupo", component: GrupoCreateComponent },
      { path: "updategrupo/:grupo", component: GrupoUpdateComponent },
      { path: "listcliente", component: ClienteListComponent },
      { path: "createcliente", component: ClienteCreateComponent },
      { path: "updatecliente/:codigo", component: ClienteUpdateComponent },
      { path: "listproduto", component: ProdutoListComponent },
      { path: "createproduto", component: ProdutoCreateComponent },
      { path: "updateproduto/:codigo", component: ProdutoUpdateComponent },
      { path: "config", component: ConfigComponent },
      { path: "listsecao", component: SecaoListComponent },
      { path: "createsecao", component: SecaoCreateComponent },
      { path: "updatesecao/:codigo", component: SecaoUpdateComponent },
      { path: "listdepto", component: DeptoListComponent },
      { path: "createdepto", component: DeptoCreateComponent },
      { path: "updatedepto/:codigo", component: DeptoUpdateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
