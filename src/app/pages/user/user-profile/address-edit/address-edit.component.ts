import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent {

  private _user: User = this.usersService.user;
  get user(){
    return this._user
  }
  
  public editUserAddressForm!: FormGroup;

  constructor( private fb: FormBuilder, private usersService: UsersService ){
    if(!this.user.address){
      
      this.usersService.getProfile().subscribe({next: resp => {
        
        this.editUserAddressForm = this.fb.group({
          address:  ['', [Validators.required, Validators.email]],
          city:     ['', [Validators.required, Validators.minLength(3)]],
          country:  ['', [Validators.required, Validators.minLength(3)]],
          cp:       ['', [Validators.required, Validators.minLength(3)]],
        })

        this._user = resp;

      }});
    }
    else{
      this.editUserAddressForm = this.fb.group({
          address:  [this._user.address?.address, [Validators.required, Validators.minLength(3)]],
          city:     [this._user.address?.city,    [Validators.required, Validators.minLength(3)]],
          country:  [this._user.address?.country, [Validators.required, Validators.minLength(3)]],
          cp:       [this._user.address?.cp,      [Validators.required, Validators.minLength(3)]],
      })
    }
  }
  upload() {
    
  }
}
