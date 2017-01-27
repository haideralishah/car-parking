import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';
declare var firebase: any;

@Component({
  selector: 'app-book-slot',
  templateUrl: './book-slot.component.html',
  styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit {
  location;
  locationName;
  parkingSlot1: any = [];
  parkingSlot2: any = [];
  parkingSlot3: any = [];
  obj: any = {};
  bookedSlot: any = [];
  bookingDetails: any;
  constructor(public router: Router, public route: ActivatedRoute, public dataService: DataService) {
    this.bookingDetails = this.dataService.getDetailsBookSlot();
    console.log(this.bookingDetails, 'this.bookingDetails');
    if (this.bookingDetails.location == 'gj') {
      this.locationName = 'Gulistan Johar'
      this.bookingDetails.location = 'Gulistan Johar'
    }
    else if (this.bookingDetails.location == 'pp') {
      this.locationName = 'Parking Plaza'
      this.bookingDetails.location = 'Parking Plaza'
    }
    else if (this.bookingDetails.location == 'km') {
      this.locationName = 'Khadda Market'
      this.bookingDetails.location = 'Khadda Market'
    }
  }
  changeRoute() {
    this.router.navigate(['./bookingdetails']);
  }

  reservedSlot = [];
  updatedReservedSlot() {
    // console.log(this.bookedSlot, 'this.bookedSlotthis.bookedSlotthis.bookedSlot');
    // console.log(this.bookedSlot, 'this.bookedSlotthis.bookedSlotthis.bookedSlot');

    for (var i = 0; i < this.parkingSlot1.length; i++) {
      for (var j = 0; j < this.bookedSlot.length; j++) {
        // console.log(this.bookedSlot[j], 'this.bookedSlot[j]');
        console.log(this.parkingSlot1[i].slotNumber, 'this.parkingSlot1[i] Outside Box');
        if (this.bookedSlot[j].slotNumber == this.parkingSlot1[i].slotNumber && this.bookedSlot[j].location == this.bookingDetails.location && (this.bookedSlot[j].startTimeInMilliSeconds >= this.bookingDetails.startTimeInMilliSeconds && this.bookedSlot[j].endTimeInMilliSeconds <= this.bookingDetails.endTimeInMilliSeconds) || (this.bookedSlot[j].endTimeInMilliSeconds >= this.bookingDetails.startTimeInMilliSeconds && this.bookedSlot[j].endTimeInMilliSeconds <= this.bookingDetails.endTimeInMilliSeconds)) {
          console.log(this.bookedSlot[j].slotNumber, '**************************');
          console.log(this.parkingSlot1[i].slotNumber, '**************************');

          this.parkingSlot1[i].slotStatus = 'reserved';
        }

        // if (this.bookedSlot[j].slotNumber == this.parkingSlot1[i].slotNumber && this.bookedSlot[j].location == this.bookingDetails.location && (this.bookedSlot[j].startTimeInMilliSeconds > this.bookingDetails.startTimeInMilliSeconds && this.bookedSlot[j].endTimeInMilliSeconds < this.bookingDetails.endTimeInMilliSeconds) || (this.bookedSlot[j].endTimeInMilliSeconds > this.bookingDetails.startTimeInMilliSeconds && this.bookedSlot[j].endTimeInMilliSeconds < this.bookingDetails.endTimeInMilliSeconds)) {
        //   console.log(this.parkingSlot1[i].slotNumber, '**************************');
        // }
      }
    }
    // for (var i = 0; i < this.parkingSlot1.length; i++) {
    //   if (this.bookedSlot.indexOf(this.parkingSlot1[i].slotNumber) != -1) {
    //     this.parkingSlot1[i].slotStatus = 'reserved';
    //   }
    // }
    // for (var i = 0; i < this.parkingSlot2.length; i++) {
    //   if (this.bookedSlot.indexOf(this.parkingSlot2[i].slotNumber) != -1) {
    //     this.parkingSlot2[i].slotStatus = 'reserved';
    //   }
    // }
    // for (var i = 0; i < this.parkingSlot3.length; i++) {
    //   if (this.bookedSlot.indexOf(this.parkingSlot3[i].slotNumber) != -1) {
    //     this.parkingSlot3[i].slotStatus = 'reserved';
    //   }
    // }
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
      let obj = data.val();
      obj.id = data.key;
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

      console.log(this.bookingDetails);
      let that = this;
      this.bookingDetails.slotNumber = selectedSlot.slotNumber;
      var userId = firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        var user = snapshot.val();
        console.log(user, 'user');
        that.bookingDetails.email = user.email
        that.bookingDetails.mobilenumber = user.mobNumber
        that.bookingDetails.userName = user.userName
        that.bookingDetails.uid = userId
        console.log(that.bookingDetails, 'bookingDetails');
        firebase.database().ref('bookedslots/').push(that.bookingDetails)
          .then((v) => {
            // console.log(v);
            that.bookingDetails = {};
            // this.warningPublish = false;

          });;
        // ...
      });




      // firebase.database().ref('bookedslots/').push(this.bookingDetails)
      //   .then((v) => {
      //     console.log(v);
      //     that.bookingDetails = {};
      //     // this.warningPublish = false;

      //   });;
      // this.router.navigate(['./bookingdetails', selectedSlot.slotNumber]);
    }






  }

}
