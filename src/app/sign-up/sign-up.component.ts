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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
  }


  registerNewUser(email, password, userName, mobNumber) {
    console.log(email, password, userName, mobNumber);
    let that = this;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log(user);
        firebase.database().ref('users/' + user.uid).set({
          email: email,
          password: password,
          userName: userName,
          mobNumber: mobNumber
        })
        this.dataService.deActiveTab();
        that.router.navigate(['./home']);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  }

}
