import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-sementes',
  templateUrl: './sementes.component.html',
  styleUrls: ['./sementes.component.css']
})
export class SementesComponent implements OnInit {

  public ofertas: Oferta[]
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getOfertas()
  }

  public getOfertas(): void {
    this.appService.getAllOfertas()
      .subscribe((ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

}
