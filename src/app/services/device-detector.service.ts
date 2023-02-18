import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  private mobile: boolean = false;

  constructor() {
    this.detectDevice();
  }

  detectDevice() {
    this.mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  isMobile(): boolean {
    return this.mobile;
  }

  isDesktop(): boolean {
    return !this.mobile;
  }
}