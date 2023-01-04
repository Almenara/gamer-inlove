import { Injectable, Testability } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  modals: { [id: string]: any; } = {};
  constructor(private allModals: NgbModal) { 
    console.log(this.modals)
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
