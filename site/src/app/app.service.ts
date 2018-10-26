import { Http, RequestOptions, Headers } from '@angular/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators'

import { Oferta } from './shared/oferta.model';
import { URL_API } from './shared/app.api'
import { Banner } from './shared/banner.model';
import { User } from './shared/user.model';

@Injectable()
export class AppService {
    constructor(private http: Http){}

    public getOfertas(): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .pipe( retry(10),
                map((resposta: Response) => resposta.json())
        )
    }

    public getAllOfertas(): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas`)
            .pipe( retry(10),
                map((resposta: Response) => resposta.json())
        )
    }

    public getOfertaById(id: number): Observable<any> {
        return this.http.get(`${URL_API}/ofertas/${id}`)
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public getBanners(): Observable<any> {
        return this.http.get(`${URL_API}/banners`)
            .pipe(
                retry(10),
                map((resposta: Response) => resposta.json())
            )
    }

    public updateBanner(banner: Banner, id) :Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-Type', 'application/json')

        return this.http.put(
            `${URL_API}/banners/${id}`,
            JSON.stringify(banner),
            new RequestOptions({ headers: headers })
        )
        .pipe( map((resposta: any) => {
            resposta.json()
        }) )
    }

    public saveBanner(banner: Banner): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/banners`, 
            JSON.stringify(banner),
            new RequestOptions({ headers : headers })
        )
        .pipe( map((resposta: Response) => {
            resposta.json()
        }) )
    }

    public delete(id: number): Observable<any> {
        return this.http.delete(`${URL_API}/banners/${id}`)
            .pipe(map((resposta: Response) => { resposta.json() }))
    }

    public getBannerByID(id: number): Observable<any> {
        return this.http.get(`${URL_API}/banners/${id}`)
            .pipe(
                map((resposta: Response) => resposta.json())
            )
    }

    public getBannerAtivo(): Observable<any> {
        return this.http.get(`${URL_API}/banners/?status=true`)
            .pipe(
                map((resposta: Response) => resposta.json())
            )
    }
    
    public updateStatus(banner: any): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-Type', 'application/json')

        banner.status = false

        return this.http.put(
            `${URL_API}/banners/${banner.id}`,
            JSON.stringify(banner),
            new RequestOptions({ headers: headers })
        )
        .pipe( map((resposta: Response) => resposta.json()))
    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?titulo_like=${termo}`)
            .pipe(retry(10),
            map((resposta: Response) => resposta.json()))
    }

    public consultaCep(cep: string): any {
        return this.http.get(`https://viacep.com.br/ws/${cep}/json/ `)
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public getEstadosBr(): any{
        return this.http.get('src/app/shared/estados.json')
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public saveUser(usuario: User): Observable<any> {
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${URL_API}/users`, 
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers })
        )
        .pipe( map((resposta: Response) => {
            resposta.json()
        }) )
    }

    public getUsers(): Observable<User[]> { 
        return this.http.get(`${URL_API}/users`)
            .pipe(map((resposta: Response) => resposta.json()))
    }

    public sendEmail(usuario: User): Observable<any>{
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `http://localhost:3001/api/email`,
            JSON.stringify(usuario),
            new RequestOptions({ headers: headers})
        )
        .pipe(map((resposta: Response) => resposta.json()))
    }
}