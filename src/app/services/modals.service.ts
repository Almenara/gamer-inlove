import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  modals: { [id: string]: any; } = {};
  constructor(private allModals: NgbModal) { 
    console.log(this.modals)
  }
  openModal(key:string){
    this.modals[key].open()
  }
  closeAllModals(){
    this.allModals.dismissAll()
  }
}
