import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.component.html',
  styleUrls: ['./book-parking.component.css']
})
export class BookParkingComponent implements OnInit {
  location;
  constructor(private router: Router, private route: ActivatedRoute) {
  
  }

  ngOnInit() {
  }
  setLocation(location) {
    console.log(location);
    this.router.navigate(['./bookslot', location]);
  }

}
