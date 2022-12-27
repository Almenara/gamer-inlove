import { ActivatedRoute } from '@angular/router';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
@Injectable() 
export class UserInfoComponent implements OnInit {

  public collection!: UserGame[];

  constructor(
    private userService:UsersService,
    private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.userService.getUserCollection().subscribe({
      next: resp => {
        this.collection = resp;
        console.log(this.collection)
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
