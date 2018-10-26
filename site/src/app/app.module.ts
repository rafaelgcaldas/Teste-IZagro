import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import {ToastaModule} from 'ngx-toasta';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { HomeComponent } from './home/home.component';
import { DefensivosComponent } from './defensivos/defensivos.component';
import { SementesComponent } from './sementes/sementes.component'
import { RouterModule } from '@angular/router';
import { OfertaComponent } from './oferta/oferta.component';
import { AppService } from './app.service';
import { HttpModule } from '@angular/http';
import { AdminComponent } from './admin/admin.component';
import { ListBannerComponent } from './admin/list-banner/list-banner.component';
import { IncluirBannerComponent } from './admin/incluir-banner/incluir-banner.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ROUTES } from './app.routes';
import { BannerFlutuanteComponent } from './banner-flutuante/banner-flutuante.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    HomeComponent,
    DefensivosComponent,
    SementesComponent,
    OfertaComponent,
    IncluirBannerComponent,
    AdminComponent,
    ListBannerComponent,
    BannerFlutuanteComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastaModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
