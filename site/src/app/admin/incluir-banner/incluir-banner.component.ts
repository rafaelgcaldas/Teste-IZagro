import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Banner } from 'src/app/shared/banner.model';
import { Subscription } from 'rxjs';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { Oferta } from '../../shared/oferta.model';


@Component({
  selector: 'app-incluir-banner',
  templateUrl: './incluir-banner.component.html',
  styleUrls: ['./incluir-banner.component.css']
})
export class IncluirBannerComponent implements OnInit, OnDestroy {

  public formulario: FormGroup
  public imagem: any
  public file: any
  public idBanner: any
  public flagButtonSave: boolean
  public reader: FileReader = new FileReader()
  public inscricao: Subscription
  public teste: Subscription
  public banner: any
  public attrDisabled: string
  public ofertas: Oferta[]
  public Urlimg: string

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private toastaService:ToastaService,
    private toastaConfig: ToastaConfig
  ) { 
    this.toastaConfig.theme = 'bootstrap';
   }

  ngOnInit() {

    this.inscricao = this.route.params.subscribe((params: any) => {
      this.idBanner = params
    })

    this.Urlimg = "/src/assets/download.svg"

    // this.imagem = this.banner.imagem
    this.flagButtonSave =  this.idBanner.id ? true : false

    this.formulario = this.fb.group({
      tipo: ["",[Validators.required]],
      nome_oferta: ["",[Validators.required]],
      descricao: ["",[Validators.required]],
      status: [false]
    })

    if(this.idBanner.id) {
      this.setFormulario(this.idBanner.id)
    }

    this.getOfertas()
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe()
  }

  public preparaImageUpload(event: Event): void {
    this.file = (<HTMLInputElement>event.target).files

    this.reader.onloadend = () => {
      this.imagem = this.reader.result
    }
    
    if(this.file) {
      this.reader.readAsDataURL(this.file[0])
    }
  }

  public onSubmit(): void {
    if(this.formulario.valid){

      let banner = this.setObjetoBanner()

      if(!this.imagem){
        this.insertToastr("Erro", "Selecione uma imagem!", 3000, "error")
        return
      }

      if(banner.status === true){
        this.appService.getBannerAtivo()
          .subscribe((banner: any) => {
            if(banner.length && banner[0].id !== +this.idBanner.id){
              this.appService.updateStatus(banner[0])
                .subscribe((resposta: any) => { })
            }
          })
      }

      if(this.idBanner.id){
        this.appService.updateBanner(banner, this.idBanner.id)
          .subscribe((resposta: any) => {
            this.insertToastr("Ok", "Banner atualizado com sucesso!", 2000, "success")
            setTimeout(() => {
              this.formulario.reset()
              this.router.navigate(["admin"])
            }, 2000);
           })
      } 
      else {
        this.appService.saveBanner(banner)
          .subscribe((resposta: any) => {
            this.formulario.reset()
            this.insertToastr("Ok", "Banner cadastrado com sucesso!", 2000, "success")
            setTimeout(() => {
              this.formulario.reset()
              this.router.navigate(["admin"])
            }, 2000);
          })
      }
    } else {
      this.formulario.get("tipo").markAsTouched(),
      this.formulario.get("nome_oferta").markAsTouched(),
      this.formulario.get("descricao").markAsTouched()
    }

  }

  public checkSelected(status: boolean): void {
    if(status){
      this.attrDisabled = "disabled"
    } else {
      this.attrDisabled =  null
    }
 }

  public setObjetoBanner(): Banner{
    return new Banner(
      this.formulario.value.tipo,
      this.imagem,
      this.formulario.value.nome_oferta.id,
      this.formulario.value.nome_oferta.titulo,
      this.formulario.value.descricao,
      this.formulario.value.status
    )
  }

  public setFormulario(id: number): void {
    this.appService.getBannerByID(id)
      .subscribe((banner: any) => { 

        this.appService.getOfertaById(banner.id_oferta)
          .subscribe((resposta: any) => {
            this.formulario.setValue({
              tipo: banner.tipo,
              nome_oferta: resposta,
              descricao: banner.descricao,
              status: banner.status
            })
          })

        this.imagem = banner.imagem
        this.checkSelected(banner.status)
      })

  }

  public msgSuccess(campo: string): boolean {
    return this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public msgError(campo: string): boolean {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public insertToastr(titulo: string, msg: string, tempo: number, tipo: string): void {
    let toastOptions:ToastOptions = {
      title: titulo,
      msg: msg,
      showClose: true,
      timeout: tempo,
      theme: 'default'
    };

    if(tipo === "success") {
      this.toastaService.success(toastOptions);
    }

    if(tipo === "error") {
      this.toastaService.error(toastOptions);
    }
  }

  public getOfertas(): void {
    this.appService.getAllOfertas()
      .subscribe((ofertas: Oferta[]) => {
        this.ofertas = ofertas
      })
  }

  public compararOfertas(obj1: any, obj2: any): boolean {
    return obj1 && obj2 ? (obj1.titulo === obj2.titulo): obj1 === obj2
  }
}
