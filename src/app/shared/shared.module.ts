import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoverComponent } from './cover/cover.component';
import { LogoComponent } from './logo/logo.component';
import { SearchElementComponent } from './header/search-element/search-element.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchElementComponent,
    FooterComponent,
    CoverComponent,
    LogoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SearchElementComponent,
    FooterComponent,
    CoverComponent,
    LogoComponent
  ]
})
export class SharedModule { }
