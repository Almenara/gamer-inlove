import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/auth.service';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 

  public logInForm: FormGroup = this.fb.group({
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required]],
  })
  
  public loginError:boolean   = false;

  public errorMessage:string  = "";

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private modalsService: ModalsService,
    private alertService: AlertService,
    private loginModalService: NgbModal) {
      this.modalsService.modals['log-in'] = this;
  }

  ngOnInit(): void {

  }

  open(){
    this.loginModalService.open(this.modalContent);
  }

  close(){
    this.loginModalService.dismissAll()
  }

  login(){
    
    this.errorMessage = "";
    this.loginError = false;

    let email = this.logInForm.value.email;
    let password = this.logInForm.value.password;
    
    this.authService.login(email, password).subscribe({
      next: resp => {        
        if(resp.ok){
          this.alertService.success('Loged successfuly!', { keepAfterRouteChange: true, autoClose: true });
          this.loginModalService.dismissAll();
        } 
        else{
        }
      }
    });
  }

  openSingUpModal(){
    this.close();
    this.modalsService.openModal('sing-up');
  }

}
