import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  private _user!: User ;

  

  get user(){
    return this._user
  }
  set user(user:User){
    this._user = user;
  }
  
  @ViewChild('avatar') avatar!: ElementRef;

  public img!: string;

  public avatarImageB64: string | null = null;

  public editUserForm!: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private authService:AuthService,
    private router : Router  ){

      this.usersService.getUserProfile().subscribe({
        next: (user) => this.user = user
      });

      this.usersService.getProfile().subscribe({next: resp => {

        this.user = resp;

        this.editUserForm  = this.fb.group({
          email:      [this.user.email,     [Validators.required, Validators.email]],
          repeatemail:[this.user.email,     [Validators.required, Validators.email]],
          name:       [this.user.name,      [Validators.required, Validators.minLength(3)]],
          surname:    [this.user.surname,   [Validators.required]],
          username:   [this.user.username,  [Validators.required, Validators.minLength(3)]],
          avatar:     [],
          password:   ['', [Validators.required]],
        })
  
      }});

  }
  
  ngOnInit(): void {

   

  }

  changeImage(){
    this.avatar.nativeElement.click();
  }

  addedImage(event: Event){
    const e = event.target as HTMLInputElement;
    const inputImg = e.files
    if (inputImg) {
      if(inputImg[0].size > 1100000)
      //TODO SISTEMA DE ALERTAS
        alert('Please image no more than 1MB.')
      else{
        this.img = URL.createObjectURL(inputImg[0])
        
        this.handleReaderLoaded(inputImg[0]);
      }
    }
  }
  handleReaderLoaded(file: Blob | File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatarImageB64 = reader.result as string;
    };
  }

  upload(){
    let user:User = {
      id: this._user.id,
      email: this.editUserForm.value.email,
      repeatemail: this.editUserForm.value.repeatemail,
      name: this.editUserForm.value.name,
      surname: this.editUserForm.value.surname,
      username: this.editUserForm.value.username,
      password: this.editUserForm.value.password,
      avatar: this.avatarImageB64,
      is_shop: false,
    }
    this.usersService.editUser(user).subscribe({
      next: () => {
        //TODO ENSAJE DE CAMBIOS HECHOS CORRECTAMENTE
        this.router.navigate(['/profile/collection'])
      },
      error: error => console.log(error)
    });
  }
}
