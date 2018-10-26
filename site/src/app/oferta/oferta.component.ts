import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Oferta } from '../shared/oferta.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  public oferta: any

  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.appService.getOfertaById(params.id)
      .subscribe((oferta: any) => {
        this.oferta = oferta
      })
    })
  }
}
