import { Component, OnInit } from '@angular/core';
import { PlatformData } from 'src/app/interfaces/platform_data';
import { PlatformsService } from 'src/app/services/platforms.service';

@Component({
  selector: 'app-for-sale-list',
  templateUrl: './for-sale-list.component.html',
  styleUrls: ['./for-sale-list.component.scss']
})
export class ForSaleListComponent implements OnInit{

  public platform!: PlatformData;
  
  public indexGame: number = 0;

  constructor(private platformsService:PlatformsService){
  }
  ngOnInit(): void {
    //this.platform = Object.assign(this.platform, this.platformsService.platformData);
    this.platform = this.platformsService.platformData;
  }
}
