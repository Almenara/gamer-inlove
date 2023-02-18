import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UsersService } from './../../../services/users.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  @Input() userGamelist!: string;

  private _userProfile!: User;
  private _user!: User;

  public classes:string[] = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-orange'];

  public bgColor:string = "";

  public secondaryColor:string = "";

  get auth() {
    return this.authService.auth;
  }

  get user(){
    return this._user;
  }
  set user(user: User){
    this._user = user;
  }

  set userProfile(user: User){
    this._userProfile = user;
  }
  get userProfile(){
    return this._userProfile
  }
  public inChat = false;

  constructor( 
      private usersService: UsersService, 
      private authService: AuthService, 
      private route: ActivatedRoute, 
      private alertService: AlertService, 
      public router: Router ) {
      
        router.events.subscribe( url =>  this.inChat = this.router.url.match(/^.*\/conversations\/\d+$/) !== null);
      
        this.user = authService.user;

        this.authService.getCacheUser().subscribe({
          next: user => this.user = user
        });

        let id:number = 0;

        this.route.paramMap.subscribe((params: ParamMap) => {
      
          this.getRandomPageColors();

          let param = params.get('idSlug');
          

          if(param){

            id = Number(param.split("-", 1))
            this.usersService.getUserById(id).subscribe({
              next:(resp)=>{
                this.userProfile = resp;
                if(this.auth.ok && this.user.id == id){
                  this.router.navigate(['/profile']);
                };
              },
              error:()=>{
                this.router.navigate(['/404']);
              }
            });
          }
        });

  }
  
  getRandomPageColors() {
    this.bgColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    while(this.secondaryColor == this.bgColor || this.secondaryColor == "bg-violet"){
        this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    }

  }
}
