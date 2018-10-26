import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public banners: any

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getBanners()
  }

  public getBanners(): void {
    this.appService.getBanners()
      .subscribe((resposta: any) => this.banners = resposta)
  }

}
