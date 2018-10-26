import { Http, Response } from '@angular/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map, retry } from 'rxjs/operators'

import { Oferta } from './shared/oferta.model'
import { URL_API} from './shared/app.api'


@Injectable()
export class OfertasService {

    constructor(private http: Http){}
    
    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(retry(10),
                map((resposta: Response) => resposta.json())
            )
    }

    
}