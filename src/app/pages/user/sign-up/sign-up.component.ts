import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

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

  constructor( private fb: FormBuilder, private usersService: UsersService ) {}

  ngOnInit(): void {
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
      next: resp => console.log(resp), 
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
}
