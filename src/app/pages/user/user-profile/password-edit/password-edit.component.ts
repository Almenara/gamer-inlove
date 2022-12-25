import { UsersService } from './../../../../services/users.service';
import { User } from './../../../../interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password-edit.component.html',
  styleUrls: ['./password-edit.component.scss']
})
export class PasswordEditComponent {

  private _user: User = this.usersService.user;
  get user(){
    return this._user
  }
  
  public editPasswordForm: FormGroup = this.fb.group({
    newpassword: ['', [Validators.required, Validators.minLength(6)]],
    repeatnewpassword: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder, private usersService: UsersService ){

    if(!this.user){
      
      this.usersService.getProfile().subscribe({next: resp => {
        
        this._user = resp;

      }});
    }
  }
  
  ngOnInit(): void {
  }

  uploadPassword(){
      const id = this._user.id;
      const newpassword = this.editPasswordForm.value.newpassword;
      const password = this.editPasswordForm.value.password;
    
    this.usersService.editPassword(password, newpassword, id!).subscribe({next: resp => console.log(resp), error: error => console.log(error)});
  }
}
