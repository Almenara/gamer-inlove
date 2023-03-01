import { Router } from '@angular/router';
import { UsersService } from './../../../../services/users.service';
import { User } from './../../../../interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

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

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private router: Router,
    private alertService: AlertService){

    if(!this.user){
      
      this.usersService.getProfile().subscribe({
        next: resp => {
          this._user = resp;
        }
      });
    }
  }
  
  ngOnInit(): void {
  }

  uploadPassword(){
      const id = this._user.id;
      const newpassword = this.editPasswordForm.value.newpassword;
      const password = this.editPasswordForm.value.password;
    
    this.usersService.editPassword(password, newpassword, id!).subscribe({
      next: resp => {
        this.alertService.success('Password edited successfully!', { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/profile']);
      }, 
      error: error => this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true })
    });
  }
}
