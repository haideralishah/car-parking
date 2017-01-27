import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
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
  constructor(private router: Router, private route: ActivatedRoute) {
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
    console.log(this.parkingSlot1, 'this.parkingSlot4');
    console.log(this.parkingSlot2, 'this.parkingSlot5');
    console.log(this.parkingSlot3, 'this.parkingSlot6');


    route.params.subscribe(params => { this.location = params['location']; });
    console.log(this.location, 'location');
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

  ngOnInit() {
  }

  bookSlot(selectedSlot) {
    console.log(selectedSlot, 'selectedSlot');
  }

}
