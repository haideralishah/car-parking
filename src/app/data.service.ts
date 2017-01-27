import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() {
    this.setNavBar('noAuth')
  }

  currentNavBar;
  setNavBar(val) {
    this.currentNavBar = val;
  }
  el1: any;
  el2: any;
  el3: any;
  el4: any;
  activeTab: any;
  deActiveTab() {
    this.el1.style.backgroundColor = '#c27f1f';
    this.el2.style.backgroundColor = '#f0ad4e';
  }

  setActiveTab() {
    this.activeTab.style.backgroundColor = '#eea236';
    this.el1.style.backgroundColor = '#f0ad4e';
    this.el2.style.backgroundColor = '#f0ad4e';
    if (this.el3) {
      this.el3.style.backgroundColor = '#f0ad4e';
    }

  }

}
