import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Address, User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss']
})
export class AddressAddComponent {

  private _user: User = this.usersService.user;
  get user(){
    return this._user
  }
  
  public addUserAddressForm!: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService, 
    private authService: AuthService, 
    private alertService: AlertService,
    private router: Router){
    this.addUserAddressForm = this.fb.group({
      address:  ['', [Validators.required, Validators.minLength(3)]],
      city:     ['', [Validators.required, Validators.minLength(3)]],
      country:  ['', [Validators.required, Validators.minLength(3)]],
      zip_code: ['', [Validators.required, Validators.minLength(3)]],
    })
  }
  add() {
    let address:Address = {
      address: this.addUserAddressForm.value.address,
      city: this.addUserAddressForm.value.city,
      country: this.addUserAddressForm.value.country,
      zip_code: this.addUserAddressForm.value.zip_code,
    }
    this.usersService.addAddress(address).subscribe({
      next: resp => {
        let user = this.user;
        user.address = resp.data.address;
        this.authService.user.address = resp.data.address;
        this.alertService.success('Address added successfuly!', { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/profile']);
      },
      error: error => this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true })
    });
  }
}
