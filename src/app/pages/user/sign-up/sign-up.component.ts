import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @ViewChild('avatar') avatar!: ElementRef;

  public img!: string;

  public avatarImageB64: string | null = null;

  public signUpForm: FormGroup = this.fb.group({
    email:          ['', [Validators.required, Validators.email]],
    repeatemail:    ['', [Validators.required, Validators.email]],
    name:           ['', [Validators.required, Validators.minLength(3)]],
    avatar:         [],
    surname:        ['', [Validators.required, Validators.minLength(3)]],
    username:       ['', [Validators.required, Validators.minLength(3)]],
    password:       ['', [Validators.required, Validators.minLength(6)]],
    repeatpassword: ['', [Validators.required, Validators.minLength(6)]],
  })

  public errorMessages:any[] = [];

  constructor( 
    private fb: FormBuilder, 
    private router: Router,
    private usersService: UsersService,
    private alertService: AlertService
    ) {}

  ngOnInit(): void {
  }

  changeImage(){
    this.avatar.nativeElement.click();
  }

  addedImage(event: Event){
    const e = event.target as HTMLInputElement;
    const inputImg = e.files
    if (inputImg) {
      if(inputImg[0].size > 1100000)
      this.alertService.warn('Images no more than 1MB, please.');
      else{
        this.img = URL.createObjectURL(inputImg[0])
        
        this.handleReaderLoaded(inputImg[0]);
      }
    }
  }
  handleReaderLoaded(file: Blob | File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatarImageB64 = reader.result as string;
      //console.log(this.avatarImageB64)
    };
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
      avatar: this.avatarImageB64,
      is_shop: false
    }

    this.usersService.postRegister(user).subscribe({
      next: resp => {
        this.alertService.success('Signed successfuly! Please, log in.', { keepAfterRouteChange: true, autoClose: true });
        this.router.navigate(['/log-in'])
      }, 
      error: error => {
        Object.keys(error.error.data).map(key => (key)).forEach(field => {
          this.signUpForm.controls[field].setErrors({'incorrect': true});
          this.signUpForm.controls[field].markAsTouched();
        });
        this.alertService.error('There was an error, please try again later.', { keepAfterRouteChange: true, autoClose: true });
        this.errorMessages = Object.keys(error.error.data).map(key => (error.error.data[key]));
      }
    });
  }
}
