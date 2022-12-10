import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.scss']
})
export class SearchElementComponent implements OnInit {
  @Input() public title: any;

  @Input() public cover: any;

  @Input() public info: any;

  @Input() public list: any;

  @Input() public alphaChannel: any;

  @Input() public dataType: string = "game";

  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
