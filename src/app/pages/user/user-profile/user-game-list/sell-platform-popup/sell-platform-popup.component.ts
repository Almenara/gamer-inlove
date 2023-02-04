import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalsService } from 'src/app/services/modals.service';
import { UsersService } from 'src/app/services/users.service';
import { UserPlatform } from 'src/app/interfaces/user_platform';
import { PlatformsService } from 'src/app/services/platforms.service';
import { Platform } from 'src/app/interfaces/platform';


@Component({
  selector: 'app-sell-platform-popup',
  templateUrl: './sell-platform-popup.component.html',
  styleUrls: ['./sell-platform-popup.component.scss']
})
export class SellPlatformPopupComponent  implements OnInit {

  @ViewChild('content') modalContent!:HTMLElement; 
  
  public sellPlatformForm!: FormGroup;

  public platform!: Platform;

  public userPlatform!: UserPlatform;

  status = {1:'New',2:'Like new',3:'External damage',4:"It doesn't work"};

  constructor( 
    private fb: FormBuilder, 
    private usersService: UsersService,
    private modalsService: ModalsService,
    private platformsService: PlatformsService,
    private gameModalService: NgbModal){

    this.sellPlatformForm = this.fb.group({
      price:      ['', [Validators.required, Validators.minLength(1),Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]],
      status:     ['', [Validators.required, Validators.minLength(1)]],
      comments:   ['', [Validators.minLength(3)]],
    })

    this.modalsService.modals['sell-platform'] = this;
    
  }
  platformForSale() {
    this.userPlatform.price = this.sellPlatformForm.value.price,
    this.userPlatform.status = this.sellPlatformForm.value.status,
    this.userPlatform.for_sale = 1,
    this.userPlatform.comments = this.sellPlatformForm.value.comments,
    this.usersService.putPlatformForSale(this.userPlatform).subscribe({
      next: resp => {
        this.close();
      },
      error: error => console.log(error)
    });
  }
  ngOnInit(): void {

  }

  open(userPlatform:UserPlatform){
    this.userPlatform = userPlatform;
    console.log(userPlatform)
    this.platformsService.getPlatform(userPlatform.platform_id).subscribe({
      next: resp=>{
        this.platform = resp.platform;
        this.gameModalService.open(this.modalContent);
      },
      error: error => console.log(error)
    });
  }

  close(){
    this.gameModalService.dismissAll()
  }
}