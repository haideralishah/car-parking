import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  location;
  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {

  }

  ngOnInit() {
  }
  setLocation(location) {
    console.log(location);
    console.log(location);
    this.dataService.setLocation(location);
    this.router.navigate(['./bookingdetails']);;
  }

}
