import { Component, OnInit } from '@angular/core';

declare var firebase: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackData: any = [];
  currentUserFeedback: any = {};
  constructor() {
    this.userID = firebase.auth().currentUser.uid;
    firebase.database().ref('/feedback').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.feedbackData.push(obj)
      console.log(this.feedbackData);
      for (var i = 0; i < this.feedbackData.length; i++) {
        if (this.feedbackData[i].uid == this.userID) {
          this.currentUserFeedback = this.feedbackData[i]
        }
      }
      console.log(this.currentUserFeedback);


    })


  }

  ngOnInit() {
  }
  userID: any;
  userDetails: any;
  sendFeedback(feedback) {
    console.log(feedback);

    let that = this;
    firebase.database().ref('/users/' + this.userID).once('value').then(function (snapshot) {
      that.userDetails = snapshot.val();
      that.userDetails.uid = snapshot.key;
      that.userDetails.feedback = feedback;
      that.userDetails.feedbackReply = '';
      console.log(that.userDetails);
      // this.saveFeedbackToDB(that.userDetails);
      firebase.database().ref('feedback/').push(that.userDetails)
        .then((v) => {
          console.log('saved', v);
        })

    });

  }

}
