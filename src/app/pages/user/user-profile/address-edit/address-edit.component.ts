import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from 'src/app/interfaces/user';
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

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private router: Router ){
      console.log(this.user)
    if(!this.user.address) this.router.navigate(['/profile/address-add']);
    else{
      this.editUserAddressForm = this.fb.group({
          address:  [this._user.address?.address, [Validators.required, Validators.minLength(3)]],
          city:     [this._user.address?.city,    [Validators.required, Validators.minLength(3)]],
          country:  [this._user.address?.country, [Validators.required, Validators.minLength(3)]],
          zip_code: [this._user.address?.zip_code,[Validators.required, Validators.minLength(3)]],
      })
    }
  }
  upload() {
    let address:Address = {
      address: this.editUserAddressForm.value.address,
      city: this.editUserAddressForm.value.city,
      country: this.editUserAddressForm.value.country,
      zip_code: this.editUserAddressForm.value.zip_code,
    }
    this.usersService.editAddress(address).subscribe({
      next: resp => {
        console.log(resp)
      },
      error: error => console.log(error)
    });
  }
}
