import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoverComponent } from './cover/cover.component';
import { LogoComponent } from './logo/logo.component';
import { SearchElementComponent } from './header/search-element/search-element.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { SingUpPopupComponent } from './sing-up-popup/sing-up-popup.component';
import { ContactPopupComponent } from './contact-popup/contact-popup.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchElementComponent,
    FooterComponent,
    CoverComponent,
    LogoComponent,
    LoginPopupComponent,
    SingUpPopupComponent,
    ContactPopupComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SearchElementComponent,
    FooterComponent,
    CoverComponent,
    LogoComponent,
    LoginPopupComponent,
    SingUpPopupComponent,
    ContactPopupComponent,
  ]
})
export class SharedModule { }
