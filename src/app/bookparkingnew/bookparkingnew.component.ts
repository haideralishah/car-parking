import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bookparkingnew',
  templateUrl: './bookparkingnew.component.html',
  styleUrls: ['./bookparkingnew.component.css']
})
export class BookparkingnewComponent implements OnInit {

  location;
  constructor(private router: Router, private route: ActivatedRoute, public dataService: DataService) {

  }

  ngOnInit() {
  }
  setLocation(location) {
    console.log(location);
    this.dataService.setLocation(location);
    this.router.navigate(['./bookingdetails']);
  }

}
