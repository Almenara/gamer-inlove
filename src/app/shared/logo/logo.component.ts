import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() public img: string | null = "";
  @Input() public name: string ="";
  @Input() public edit: boolean = false;
  @Input() public alphaChannel: boolean = false;
  @Input() public user: boolean = false;
  
  public avatarURL:string = environment.baseUrl + environment.avatarPath;

  public initial: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.name && this.name != ""){
      this.initial = this.name.charAt(0);
    }
    if(this.user && this.img){
      this.img = this.avatarURL + this.img;
    }
    else{
      if(this.img != "" && this.img != null ){
        if (!this.img.includes('.')){
            this.img = `${this.img}.png`;
        }
        if (!this.img.includes('http')){
          this.img = `https://images.igdb.com/igdb/image/upload/t_logo_med/${this.img}`;
        }
      }
    }
  }
}
