import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Banner } from 'src/app/shared/banner.model';

@Component({
  selector: 'app-list-banner',
  templateUrl: './list-banner.component.html',
  styleUrls: ['./list-banner.component.css']
})
export class ListBannerComponent implements OnInit {

  public banners: any
  public flag: boolean = false
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getBanners()
  }

  public getBanners(): void {
    this.appService.getBanners()
      .subscribe((banners: any) => { 
        this.banners = banners
        if(this.banners.length === 0){
          this.flag = true
        } else {
          this.flag = false
        } 
      })
  }

  public delete(banner: Banner, id: number): void {
    if (confirm("Tem certeza de que deseja excluir o banner " + banner.titulo + "?")){
      this.appService.delete(id)
        .subscribe(() => {
          this.getBanners()
        })
    }
  }

}
