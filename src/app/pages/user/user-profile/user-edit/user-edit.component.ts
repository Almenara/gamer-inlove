import { UsersService } from './../../../../services/users.service';
import { Form, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
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
  
  public editUserForm!: FormGroup;

  constructor( private fb: FormBuilder, private usersService: UsersService  ){

    if(!this.user){
      
      this.usersService.getProfile().subscribe({next: resp => {
        
        this.editUserForm  = this.fb.group({
          email:    [resp.email, [Validators.required, Validators.email]],
          name:     [resp.name, [Validators.required, Validators.minLength(3)]],
          surname:  [resp.surname, [Validators.required, Validators.minLength(3)]],
          username: [resp.username, [Validators.required, Validators.minLength(3)]],
          password: ['', [Validators.required, Validators.minLength(6)]],
        })

        this._user = resp;

      }});
    }
    else{
      this.editUserForm  = this.fb.group({
        email:    [this._user.email, [Validators.required, Validators.email]],
        name:     [this._user.name, [Validators.required, Validators.minLength(3)]],
        surname:  [this._user.surname, [Validators.required, Validators.minLength(3)]],
        username: [this._user.username, [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    }
  }
  
  ngOnInit(): void {
  }

  upload(){
    let user:Object = {
      id: this._user.id,
      currentMail: this._user.email,
      email: this.editUserForm.value.email,
      name: this.editUserForm.value.name,
      surname: this.editUserForm.value.surname,
      username: this.editUserForm.value.username,
      password: this.editUserForm.value.password
    }
    this.usersService.postRegister(user).subscribe({next: resp => console.log(resp), error: error => console.log(error)});
  }
}
