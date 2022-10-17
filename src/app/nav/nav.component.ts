import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  constructor(private router: Router) {}

  isAdmin!: boolean;
  corMenu = localStorage.getItem("corMenu");
  corIcone = localStorage.getItem("corIcone");
  corFundo = localStorage.getItem("corFundo");
  corBotao = localStorage.getItem("corBotao");

  ngOnInit(): void {
    this.router.navigate(["home"]);
    if (localStorage.getItem("role") === "1") {
      this.isAdmin = true;
    }
  }

  logout() {
    localStorage.removeItem("nome");
    localStorage.removeItem("senha");
    localStorage.removeItem("role");
    this.router.navigate(["/login"]);
  }
}
