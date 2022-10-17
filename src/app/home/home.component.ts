import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  nome: any = localStorage.getItem("nome");
  copyright: string = environment.copyright;

  constructor() {}

  ngOnInit(): void {}
}
