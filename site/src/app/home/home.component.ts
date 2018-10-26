import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public ofertas: Oferta[]

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getOfertas()
  }

  public getOfertas(): void {
    this.appService.getOfertas()
      .subscribe((ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
