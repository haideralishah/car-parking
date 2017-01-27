import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';

declare var firebase: any


@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {
  location;
  optionTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',]
  constructor(public router: Router, public dataService: DataService) {
    // route.params.subscribe(params => { this.location = params['location']; });
    this.location = this.dataService.location;

  }
  changeRoute() {
    this.router.navigate(['./bookslot']);
  }
  ngOnInit() {
  }
  error: any = {};
  detailsObj: any = {};
  bookingDetails(selectDate, starttime, selecthours) {
    // this.router.navigate(['./bookslot']);

    let rightNow = new Date().getTime();
    let dateObjInMilliSeconds = this.parseDate(selectDate).getTime();

    if (!selectDate) {
      this.error.status = true;
      this.error.message = 'Date is required.';
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (!starttime) {
      this.error.status = true;
      this.error.message = 'Start time is required.';
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (!selecthours) {
      this.error.status = true;
      this.error.message = 'Hours are required.';
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (rightNow - dateObjInMilliSeconds > 0) {
      this.error.status = true;
      this.error.message = 'You need to select future date.';
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else {
      starttime = starttime.slice(0, 2);
      let startTimeInMilliSeconds = (starttime * 60000 * 60) + dateObjInMilliSeconds;
      let endTimeInMilliSeconds = ((starttime + selecthours) * 60000 * 60) + dateObjInMilliSeconds;
      this.detailsObj.location = this.location;
      this.detailsObj.startTimeInMilliSeconds = startTimeInMilliSeconds;
      this.detailsObj.endTimeInMilliSeconds = endTimeInMilliSeconds;

      this.dataService.setDetailsBookSlot(this.detailsObj);
      this.router.navigate(['./bookslot']);
    }

  }

  parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }
}


