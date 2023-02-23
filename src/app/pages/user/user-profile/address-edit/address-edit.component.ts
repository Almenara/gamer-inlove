import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address, User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss']
})
export class AddressEditComponent {

  public user: User = this.authService.user;
  
  public editUserAddressForm!: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router ){
      
      this.authService.userDataSubject.subscribe(data => {
        this.user = data;
      });
      
      this.editUserAddressForm = this.fb.group({
        address:  [this.user.address?.address, [Validators.required]],
        city:     [this.user.address?.city,    [Validators.required]],
        country:  [this.user.address?.country, [Validators.required]],
        zip_code: [this.user.address?.zip_code,[Validators.required]],
      })
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
        this.alertService.success('Address edited successfuly!', { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/profile'])
      },
      error: error => {
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true })
      }
    });
  }
}
