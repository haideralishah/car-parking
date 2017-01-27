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
  deActiveTab() {
    this.el1.style.backgroundColor = '#c27f1f';
    this.el1.style.backgroundColor = '#f0ad4e';
  }

}
