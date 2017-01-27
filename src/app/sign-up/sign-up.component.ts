import { Component, OnInit } from '@angular/core';

declare var firebase: any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  registerNewUser(email, password, userName, dob, mobNumber) {
    console.log(email, password, userName, dob, mobNumber);

    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    // });
  }

}
