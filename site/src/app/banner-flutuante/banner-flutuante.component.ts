import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import {ToastaService, ToastaConfig, ToastOptions, ToastData} from 'ngx-toasta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Estados } from '../shared/estados.model';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-banner-flutuante',
  templateUrl: './banner-flutuante.component.html',
  styleUrls: ['./banner-flutuante.component.css'],
  animations: [
    trigger('animacao-banner', [
      state("show", style({
        opacity: 1,
        right: "50%",
        position: "fixed",
        transform: 'translate(50%, 0px)'
      })),
      state("hide", style({
        opacity: 0,
        transform: 'translate(-1000px, 0px)'
      })),
      transition("void => show",[
        style({opacity: 0,
          transform: 'translate(0px, 0px)'}),
        animate("2s 0s ease-in-out")
      ]),
        transition("show => hide", [
        style({opacity: 0}),
        animate("2s 0s ease-in-out")
      ])
    ])
  ]
})
export class BannerFlutuanteComponent implements OnInit {

  public estadoBanner: string = "show"
  public estadoForm: boolean = false
  public formulario: FormGroup
  public estados: Observable<Estados[]>

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private toastaService:ToastaService,
    private toastaConfig: ToastaConfig
  ) { }

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ["",[Validators.required]],
      email: ["",[Validators.required]],
      rua: ["",[Validators.required]],
      cep: ["",[Validators.required]],
      numero: ["",[Validators.required]],
      complemento: [""],
      bairro: ["",[Validators.required]],
      cidade: ["",[Validators.required]],
      estado: ["",[Validators.required]]
    })

    this.estados = this.appService.getEstadosBr()
  }

  public onSubmit(): void {
    if(this.formulario.valid){

      let usuario = this.setObjetoUsuario()
      
      this.appService.saveUser(usuario)
        .subscribe((resposta: any) => {
          
          this.appService.sendEmail(usuario)
            .subscribe((resposta: any) => { })

          this.insertToastr("Ok", "Dados cadastrados com sucesso!", 2000, "success")
          setTimeout(() => {
            this.formulario.reset()
            this.hide()
          }, 2000);
        })
    } else {
      this.formulario.get("nome").markAsTouched(),
      this.formulario.get("email").markAsTouched()
      this.formulario.get("rua").markAsTouched()
      this.formulario.get("cep").markAsTouched()
      this.formulario.get("numero").markAsTouched()
      this.formulario.get("complemento").markAsTouched()
      this.formulario.get("bairro").markAsTouched()
      this.formulario.get("cidade").markAsTouched()
      this.formulario.get("estado").markAsTouched()
    }
  }

  public hide(): void {
    this.estadoBanner = "hide"
  }

  public showForm(): void {
    this.estadoForm = true
  }

  public msgSuccess(campo: string): boolean {
    return this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public msgError(campo: string): boolean {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched
  }

  public consultaCep(cepConsulta: string): void {
    let cep = cepConsulta.replace(/\D/g, "")

    if(cep != ""){
      let validaCep = /^[0-9]{8}$/
      if(validaCep.test(cep)){
        this.appService.consultaCep(cep)
        .subscribe((resposta: any) => {
            this.formulario.patchValue({
              rua: resposta.logradouro,
              cep: resposta.cep,
              complemento: resposta.complemento,
              bairro: resposta.bairro,
              cidade: resposta.localidade,
              estado: resposta.uf
            })
          })
      }
    }
  }

  public setObjetoUsuario(): User{
    return new User(
      this.formulario.value.nome,
      this.formulario.value.email,
      this.formulario.value.rua,
      this.formulario.value.cep,
      this.formulario.value.numero,
      this.formulario.value.complemento,
      this.formulario.value.bairro,
      this.formulario.value.cidade,
      this.formulario.value.estado
    )
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

}
