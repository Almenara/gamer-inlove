import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  public logInForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
  })
  constructor(private fb: FormBuilder, private loginService: LoginService ) { }

  ngOnInit(): void {

  }
  login(){
    let email = this.logInForm.value.email;
    let password = this.logInForm.value.password;
    this.loginService.login(email, password).subscribe({
      next: resp => {
        const token:string = resp.data.token.accessToken;
        // console.log(resp)
        localStorage.setItem('user', JSON.stringify(resp));
        console.log(this.loginService.isValidToken());
        
      }, 
      error: error => console.log(error)
    });
  }
}
