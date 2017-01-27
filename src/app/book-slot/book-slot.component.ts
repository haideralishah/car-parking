import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

declare var firebase: any;

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit {
  location;
  locationName;
  // parkingSlot1: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // parkingSlot2: any = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  // parkingSlot3: any = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  parkingSlot1: any = [];
  parkingSlot2: any = [];
  parkingSlot3: any = [];
  obj: any = {};
  bookedSlot: any = [];
  constructor(public router: Router, public route: ActivatedRoute) {
    route.params.subscribe(params => { this.location = params['location']; });

    if (this.location == 'gj') {
      this.locationName = 'Gulistan Johar'
    }
    else if (this.location == 'pp') {
      this.locationName = 'Parking Plaza'
    }
    else if (this.location == 'km') {
      this.locationName = 'Khadda Market'
    }
  }


  reservedSlot = [];
  updatedReservedSlot() {
    for (var i = 0; i < this.parkingSlot1.length; i++) {
      if (this.bookedSlot.indexOf(this.parkingSlot1[i].slotNumber) != -1) {
        this.parkingSlot1[i].slotStatus = 'reserved';
      }
    }
    for (var i = 0; i < this.parkingSlot2.length; i++) {
      if (this.bookedSlot.indexOf(this.parkingSlot2[i].slotNumber) != -1) {
        this.parkingSlot2[i].slotStatus = 'reserved';
      }
    }
    for (var i = 0; i < this.parkingSlot3.length; i++) {
      if (this.bookedSlot.indexOf(this.parkingSlot3[i].slotNumber) != -1) {
        this.parkingSlot3[i].slotStatus = 'reserved';
      }
    }
  }


  ngOnInit() {
    for (var i = 0; i < 30; i++) {
      this.obj.slotNumber = i + 1;
      this.obj.slotStatus = 'available';
      if (i < 10) {
        this.parkingSlot1.push(this.obj);
      } else if (i >= 10 && i < 20) {
        this.parkingSlot2.push(this.obj);
      } else {
        this.parkingSlot3.push(this.obj);
      }
      this.obj = {};
    }




    firebase.database().ref('/bookedslots').on('child_added', (data) => {
      let obj = data.val().slotNumber;
      // obj.id = data.key;
      this.bookedSlot.push(obj)

      this.updatedReservedSlot()
    })
  }
  warning: any = {};
  bookSlot(selectedSlot) {
    console.log(selectedSlot, 'selectedSlot');

    if (selectedSlot.slotStatus == 'reserved') {
      console.log(selectedSlot.slotStatus, 'selectedSlot.slotStatus');
      this.warning.status = true;
      this.warning.message = 'Already Reserved Slot';
      setTimeout(() => {
        this.warning.status = false;
        this.warning.message = ''
      }, 3000);
    }
    else {
      this.router.navigate(['./bookingdetails', selectedSlot.slotNumber]);
    }






  }

}
