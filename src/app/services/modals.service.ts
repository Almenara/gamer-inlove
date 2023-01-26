import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  modals: { [id: string]: any; } = {};
  constructor(private allModals: NgbModal) { 
  }
  openModal(key:string, object?:any){
    if(object)
      this.modals[key].open(object);
    else
      this.modals[key].open()
  }
  closeAllModals(){
    this.allModals.dismissAll()
  }
}
