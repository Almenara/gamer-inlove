import { Router } from '@angular/router';
import { UsersService } from './../../../../services/users.service';
import { Form, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {

  private _user: User = this.usersService.user;
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
    private router : Router  ){

    if(!this.user){
      
      this.usersService.getProfile().subscribe({next: resp => {
        
        this.editUserForm  = this.fb.group({
          email:      [resp.email, [Validators.required, Validators.email]],
          repeatemail:[resp.email, [Validators.required, Validators.email]],
          name:       [resp.name, [Validators.required, Validators.minLength(3)]],
          surname:    [resp.surname, [Validators.required]],
          username:   [resp.username, [Validators.required, Validators.minLength(3)]],
          avatar:     [],
          password:   ['', [Validators.required]],
        })

        this._user = resp;

      }});
    }
    else{
      this.editUserForm  = this.fb.group({
          email:      [this._user.email, [Validators.required, Validators.email]],
          repeatemail:[this._user.email, [Validators.required, Validators.email]],
          name:       [this._user.name, [Validators.required, Validators.minLength(3)]],
          surname:    [this._user.surname, [Validators.required]],
          username:   [this._user.username, [Validators.required, Validators.minLength(3)]],
          avatar:     [],
          password:   ['', [Validators.required]],
      })
    }
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
        this.router.navigate(['/profile/collection'])
      },
      error: error => console.log(error)
    });
  }
}
