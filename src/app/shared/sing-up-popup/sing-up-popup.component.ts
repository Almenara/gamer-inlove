import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.scss']
})
export class SingUpPopupComponent implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 

  public signUpForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    repeatemail:    ['', [Validators.required, Validators.email]],
    name:     ['', [Validators.required, Validators.minLength(3)]],
    surname:  ['', [Validators.required, Validators.minLength(3)]],
    username:  ['', [Validators.required, Validators.minLength(3)]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
    repeatpassword:    ['', [Validators.required, Validators.minLength(6)]],
  })

  public errorMessages:any[] = [];

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private modalsService: ModalsService,
    private loginModalService: NgbModal) {
      this.modalsService.modals['sing-up'] = this;
   } 

  ngOnInit(): void {
  }

  open(){
    this.loginModalService.open(this.modalContent);
  }

  close(){
    this.loginModalService.dismissAll()
  }

  register(){
    this.errorMessages = [];
    let user:User = {
      id: undefined,
      email: this.signUpForm.value.email,
      repeatemail: this.signUpForm.value.repeatemail,
      name: this.signUpForm.value.name,
      surname: this.signUpForm.value.surname,
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      repeatpassword: this.signUpForm.value.repeatpassword,
      image: undefined,
      is_shop: false
    }
    this.usersService.postRegister(user).subscribe({
      next: resp => this.openLogInModal(),
      error: error => {
        Object.keys(error.error.data).map(key => (key)).forEach(field => {
          this.signUpForm.controls[field].setErrors({'incorrect': true});
          this.signUpForm.controls[field].markAsTouched();
        });
        //TODO modal alert errors
        this.errorMessages = Object.keys(error.error.data).map(key => (error.error.data[key]));
      }
    });
  }

  openLogInModal(){
    this.close();
    this.modalsService.openModal('log-in');
  }

}
