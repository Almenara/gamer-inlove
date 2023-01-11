import { PlatformData } from 'src/app/interfaces/platform_data';
import { PlatformsService } from 'src/app/services/platforms.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  public platform!: PlatformData;
  
  public indexGame: number = 0;

  constructor(private platformsService:PlatformsService){
    this.platform = this.platformsService.platformData
    console.log(this.platform)
  }

}
