import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';
declare var firebase: any;

@Component({
  selector: 'app-view-user-admin',
  templateUrl: './view-user-admin.component.html',
  styleUrls: ['./view-user-admin.component.css']
})
export class ViewUserAdminComponent implements OnInit {

  users: any = [];
  userID: any;
  constructor(public router: Router, public route: ActivatedRoute, public dataService: DataService, public http: Http) {

    firebase.database().ref('/users').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.users.push(obj)
      console.log(this.users, 'users');
    })
    this.userID = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
  }

}
