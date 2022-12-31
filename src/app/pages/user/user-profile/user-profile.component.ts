import { Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  private _user!: User;

  get user(){
    if(this.usersService.user) this._user = this.usersService.user;
    return this._user;
  }
  set user(user: User){
    if(this.usersService.user) this._user = this.usersService.user;
    this._user = user
  }
  constructor( private usersService: UsersService, public router: Router ) { }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe({
      next:(resp)=>{
        this.user = this.usersService.user;
        console.log(this.user);
      },
      error:(error)=>{
        this.router.navigate(['/login']);
      }
    })
  }
}
