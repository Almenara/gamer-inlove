import { Message } from 'src/app/interfaces/message';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public logInForm: FormGroup = this.fb.group({
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required]],
  })
  public loginError:boolean   = false;
  public errorMessage:string  = "";

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private alertService: AlertService,
    public router: Router ) { }

  ngOnInit(): void {

  }
  
  login(){
    
    this.errorMessage = "";
    this.loginError = false;

    let email = this.logInForm.value.email;
    let password = this.logInForm.value.password;
    
    this.authService.login(email, password).subscribe({
      next: resp => {
        if(resp.ok){
          this.alertService.success('Login successful!', { keepAfterRouteChange: true, autoClose: true });
          this.router.navigate(['/profile'])
        } 
        else{ 
          this.alertService.error('ERROR! Please, try again later', { keepAfterRouteChange: true, autoClose: true });
        }
      },
      error: error => this.alertService.error(error.message, { keepAfterRouteChange: true, autoClose: true })
      
    });
  }
}
