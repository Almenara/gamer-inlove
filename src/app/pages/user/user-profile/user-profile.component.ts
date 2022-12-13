import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor( private usersService: UsersService, public router: Router ) { }

  ngOnInit(): void {
    this.usersService.getProfile().subscribe({
      next:(resp)=>{
        console.log(resp)
      },
      error:(error)=>{
        console.log(error);
        this.router.navigate(['/']);
      }
    })
  }

}
