import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalsService } from 'src/app/services/modals.service';
import { Address } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-address-popup',
  templateUrl: './address-popup.component.html',
  styleUrls: ['./address-popup.component.scss']
})
export class AddressPopupComponent implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 
  
  public addUserAddressForm!: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private modalsService: ModalsService,
    private addressModalService: NgbModal){

    this.addUserAddressForm = this.fb.group({
      address:  ['', [Validators.required, Validators.minLength(3)]],
      city:     ['', [Validators.required, Validators.minLength(3)]],
      country:  ['', [Validators.required, Validators.minLength(3)]],
      zip_code: ['', [Validators.required, Validators.minLength(3)]],
    })

    this.modalsService.modals['address'] = this;
    
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
        this.close();
      },
      error: error => console.log(error)
    });
  }
  ngOnInit(): void {

  }

  open(){
    this.addressModalService.open(this.modalContent);
  }

  close(){
    this.addressModalService.dismissAll()
  }
}