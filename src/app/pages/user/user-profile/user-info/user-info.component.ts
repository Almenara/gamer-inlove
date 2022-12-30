import { UserWishplatform } from 'src/app/interfaces/user_wishplatform';
import { UserPlatform } from './../../../../interfaces/user_platform';
import { ActivatedRoute } from '@angular/router';
import { UserGame } from 'src/app/interfaces/user_game';
import { UsersService } from 'src/app/services/users.service';
import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserWishgame } from 'src/app/interfaces/user_wishgame';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
@Injectable() 
export class UserInfoComponent implements OnInit {

  public gameCollection!: UserGame[];
  public gameWishlist!: UserWishgame[];
  public platformCollection!: UserPlatform[];
  public platformWishlist!: UserWishplatform[];

  constructor(
    private userService:UsersService,
    private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.userService.getUserCollectionAndWishlist().subscribe({
      next: resp => {
        this.gameCollection = resp.gameCollection;
        this.gameWishlist = resp.gameWishlist;
        this.platformCollection = resp.platformCollection;
        this.platformWishlist = resp.platformWishlist;
        console.log(resp)
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
