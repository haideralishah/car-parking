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
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  bookedSlot: any = [];
  userID: any;
  constructor(public router: Router, public route: ActivatedRoute, public dataService: DataService, public http: Http) {

    firebase.database().ref('/bookedslots').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      obj.startTimeInMilliSeconds = new Date(obj.startTimeInMilliSeconds);
      obj.endTimeInMilliSeconds = new Date(obj.endTimeInMilliSeconds);
      this.bookedSlot.push(obj)
      console.log(this.bookedSlot);
    })
    this.userID = firebase.auth().currentUser.uid;
    console.log(this.userID);
  }

  ngOnInit() {
  }
  warning: any = {};
  cancelBooking(cancelObj) {
    console.log(cancelObj);
    var deleteNode = firebase.database().ref('/bookedslots/' + cancelObj.id);
    deleteNode.remove();
    this.warning.status = true;
    this.warning.message = 'Your booked slot has been cancelled.';
    setTimeout(() => {
      this.warning.status = false;
      this.warning.message = ''
    }, 6000);

  }
}
