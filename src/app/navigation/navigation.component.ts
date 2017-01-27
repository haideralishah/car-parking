import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
declare var firebase: any

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }
  el: any;
  secEl: any;
  setActive(el, secEl) {
    this.dataService.el1 = el;
    this.dataService.el2 = secEl;
    el.style.backgroundColor = '#c27f1f';
    secEl.style.backgroundColor = '#f0ad4e';
  }
  logout() {
    this.dataService.setNavBar('noAuth');

    firebase.auth().signOut().then(function () {
      localStorage.clear();
      // Sign-out successful.
    }, function (error) {
      // An error happened.
    });
  }

}
