import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenMenuService {
  private _menuIsOpen: boolean = false;
  private _notificationsIsOpen: boolean = false;
  
  get menuIsOpen(): boolean{
    return this._menuIsOpen
  }
  get notificationsIsOpen(): boolean{
    return this._notificationsIsOpen
  }
  toggleMenu(){
    this._menuIsOpen = !this._menuIsOpen;
    this._notificationsIsOpen = !this._notificationsIsOpen;
    if(this._menuIsOpen){
      document.querySelector('html')!.classList.add('menu-opened')
    }
    else{
      document.querySelector('html')!.classList.remove('menu-opened')
    }
    return this.menuIsOpen;
  }
  toggleNotificationList(){
    this._notificationsIsOpen = !this._notificationsIsOpen;
    return this._notificationsIsOpen;
  }
  closeMenu(){
    this._menuIsOpen = false;
    document.querySelector('html')!.classList.remove('menu-opened')
    return false
  }

}
