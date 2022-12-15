import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    return this._user;
  }

  constructor( private usersService: UsersService, public router: Router ) { }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe({
      next:(resp)=>{
        this._user = resp;
      },
      error:(error)=>{
        console.log(error);
        this.router.navigate(['/']);
      }
    })
  }

}
