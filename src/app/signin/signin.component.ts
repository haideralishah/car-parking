import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

declare var firebase: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public dataService: DataService, private router: Router) { }

  ngOnInit() {
  }
  error: any = {};

  loginUser(email, password) {
    let that = this;
    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
      this.error.message = 'Email address is invalid.'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (password.length <= 4) {
      this.error.message = 'Password must be greater than 4 cheractors.'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }

    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          firebase.database().ref('/users/' + user.uid).once('value')
            .then(function (snapshot) {
              var userRoll = snapshot.val();
              if (userRoll.roll == 'admin') {
                that.dataService.setNavBar('adminAuth');
                that.router.navigate(['./viewbookingadmin']);
              }
              else {
                that.dataService.setNavBar('userAuth');
                that.router.navigate(['./viewparking']);
              }
              // ...
            });


        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage, 'errorMessage');
          console.log(errorCode, 'errorCode');
          if (errorMessage == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            that.error.message = errorMessage
            that.error.status = true;
            setTimeout(() => {
              that.error.status = false;
              that.error.message = ''
            }, 5000);
          }
          else if (errorMessage == 'The password is invalid or the user does not have a password.') {
            that.error.message = errorMessage
            that.error.status = true;
            setTimeout(() => {
              that.error.status = false;
              that.error.message = ''
            }, 5000);
          }
          // ...
        });
    }
  }
}
