import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { DefensivosComponent } from './defensivos/defensivos.component';
import { SementesComponent } from './sementes/sementes.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AdminComponent } from './admin/admin.component';
import { ListBannerComponent } from './admin/list-banner/list-banner.component';
import { IncluirBannerComponent } from './admin/incluir-banner/incluir-banner.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';

export const ROUTES: Routes = [
    { path: "", component: HomeComponent},
    { path: "defensivos", component: DefensivosComponent },
    { path: "sementes", component: SementesComponent },
    { path: "oferta", component: HomeComponent },
    { path: "oferta/:id", component: OfertaComponent },
    { path:"admin", component: AdminComponent,
        children: [
            { path: "", component: ListBannerComponent },
            { path: "list-users", component: ListUsersComponent},
            { path: "list-banner", component: ListBannerComponent },
            { path: "incluirBanner", component: IncluirBannerComponent },
            { path: "incluirBanner/:id", component: IncluirBannerComponent }
        ]
    }
]