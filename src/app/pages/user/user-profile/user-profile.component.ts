import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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

  public classes:string[] = ['bg-red', 'bg-blue', 'bg-yellow', 'bg-orange'];

  public bgColor:string = "";

  public secondaryColor:string = "";

  get user(){
    if(this.usersService.user) this._user = this.usersService.user;
    return this._user;
  }
  set user(user: User){
    if(this.usersService.user) this._user = this.usersService.user;
    this._user = user
  }
  constructor( 
    private usersService: UsersService, 
    private route: ActivatedRoute, 
    public router: Router ) { }

  ngOnInit(): void {

    let id:number = 0;

    this.route.paramMap.subscribe((params: ParamMap) => {
     
      this.getRandomPageColors();

      const param = params.get('idSlug')

      
      if(param) id = Number(param.split("-", 1));
  
    });
    if(!id){
      this.usersService.getProfile().subscribe({
        next:(resp)=>{
          this.user = this.usersService.user;
        },
        error:(error)=>{
          this.router.navigate(['/login']);
        }
      })
    }
    else{
      this.usersService.getUserById(id).subscribe({
        next:(resp) => {
          this.user = resp
          console.log(id)
          console.log(this.user)
        },
        error:(error)=>{
          //TODO mensaje de error
          console.log(error)
        }
      })
    }
  }

  getRandomPageColors() {
    this.bgColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    while(this.secondaryColor == this.bgColor || this.secondaryColor == "bg-violet"){
        this.secondaryColor = this.classes[Math.floor(Math.random() * this.classes.length)];
    }

  }

}
