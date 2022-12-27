import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.scss']
})
export class CoverComponent implements OnInit {

  @Input() public img: string = "";
  @Input() public alphaChannel: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
    if (!this.img || this.img == ""){
      this.img = "../../../../assets/images/default.png"
    }
    else{
      if (!this.img.includes('.')){
        if(this.alphaChannel)
          this.img = `${this.img}.png`;
        else
          this.img = `${this.img}.jpg`;
      }
      if (!this.img.includes('http')){
        this.img = `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${this.img}`;
      }
    }
  }

}
