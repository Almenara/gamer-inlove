import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenMenuService {
  private _menuIsOpen:Boolean = false;
  
  get menuIsOpen():Boolean{
    return this._menuIsOpen
  }
  toggleMenu(){
    this._menuIsOpen = !this._menuIsOpen;
    if(this._menuIsOpen)
      document.querySelector('html')!.classList.add('menu-opened')
    else
      document.querySelector('html')!.classList.remove('menu-opened')
    return this.menuIsOpen;
  }
  closeMenu(){
    this._menuIsOpen = false;
    document.querySelector('html')!.classList.remove('menu-opened')
    return false
  }

}
