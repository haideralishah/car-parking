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
  selector: 'app-view-parking',
  templateUrl: './view-parking.component.html',
  styleUrls: ['./view-parking.component.css']
})
export class ViewParkingComponent implements OnInit {
  bookedSlot: any = [];
  constructor(private router: Router, public dataService: DataService) {
    firebase.database().ref('/bookedslots').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.bookedSlot.push(obj)
      console.log(this.bookedSlot);
    })
  }

  ngOnInit() {
  }

}
