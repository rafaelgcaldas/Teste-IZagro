import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public usuarios: User[]
  public flag: boolean = false

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getUsers()
  }

  public getUsers(): void {
    this.appService.getUsers()
      .subscribe((usuarios: any) => {
        this.usuarios = usuarios
        if(this.usuarios.length === 0){
          this.flag = true
        } else {
          this.flag = false
        }
      })
  }

}
