import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sing-up-popup',
  templateUrl: './sing-up-popup.component.html',
  styleUrls: ['./sing-up-popup.component.scss']
})
export class SingUpPopupComponent implements OnInit {

  public signUpForm: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    name:     ['', [Validators.required, Validators.minLength(3)]],
    surname:  ['', [Validators.required, Validators.minLength(3)]],
    username:  ['', [Validators.required, Validators.minLength(3)]],
    password:    ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor( private fb: FormBuilder, private usersService: UsersService ) {}

  ngOnInit(): void {
  }
  register(){
    let user:User = {
      id: undefined,
      email: this.signUpForm.value.email,
      name: this.signUpForm.value.name,
      surname: this.signUpForm.value.surname,
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      image: undefined,
      is_shop: false
    }
    this.usersService.postRegister(user).subscribe({next: resp => console.log(resp), error: error => console.log(error)});
  }
}
