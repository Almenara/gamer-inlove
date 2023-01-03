import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {
  public logInForm: FormGroup = this.fb.group({
    email:        ['', [Validators.required, Validators.email]],
    password:     ['', [Validators.required, Validators.minLength(6)]],
  })
  public loginError:boolean   = false;
  public errorMessage:string  = "";
  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router ) { }

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
          this.router.navigate(['/profile'])
        } 
        else{
        }
      }
    });
  }
}