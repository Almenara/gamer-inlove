import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    name:     ['', [Validators.required, Validators.minLength(3)]],
    surname:  ['', [Validators.required, Validators.minLength(3)]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder, private usersService: UsersService ) {}

  ngOnInit(): void {
  }
  register(){
    let user:Object = {
      email: this.signUpForm.value.email,
      name: this.signUpForm.value.name,
      surname: this.signUpForm.value.surname,
      password: this.signUpForm.value.password
    }
    this.usersService.postRegister(user).subscribe(resp => console.log(resp), error => console.log(error));
  }
}
