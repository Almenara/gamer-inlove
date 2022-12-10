import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  @Input() public img: string = "";
  @Input() public name: string ="";
  @Input() public alphaChannel: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (!this.img || this.img == ""){
      this.img = "../../../../assets/images/default.png"
    }
    else{
      if (!this.img.includes('.')){
          this.img = `${this.img}.png`;
      }
      if (!this.img.includes('http')){
        this.img = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${this.img}`;
      }
    }
  }

}
