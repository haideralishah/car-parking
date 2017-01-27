import { Component, OnInit } from '@angular/core';

declare var firebase: any;



@Component({
  selector: 'app-view-feedback-admin',
  templateUrl: './view-feedback-admin.component.html',
  styleUrls: ['./view-feedback-admin.component.css']
})
export class ViewFeedbackAdminComponent implements OnInit {
  feedbackData: any = [];
  userID: any;
  currentUserFeedback: any = [];
  constructor() {

    this.userID = firebase.auth().currentUser.uid;
    firebase.database().ref('/feedback').on('child_added', (data) => {
      // console.log(data, 'data');
      let obj = data.val();
      console.log();
      obj.id = data.key;
      this.currentUserFeedback.push(obj)
      console.log(this.currentUserFeedback, 'this.feedbackData this.feedbackData this.feedbackData');
      // for (var i = 0; i < this.feedbackData.length; i++) {
      //   if (this.feedbackData[i].uid == this.userID) {
      //     this.currentUserFeedback = this.feedbackData[i]
      //   }
      // }
      console.log(this.currentUserFeedback);
    })
  }

  ngOnInit() {
  }


  sendFeedback(reply, feedback) {
    console.log(reply, feedback, 'reply, feedback reply, feedback');
    feedback.feedbackReply = reply;
    console.log(feedback, 'feedback');
    firebase.database().ref('feedback/' + feedback.id).set(feedback);

    // let that = this;
    // firebase.database().ref('/users/' + this.userID).once('value').then(function (snapshot) {
    //   that.userDetails = snapshot.val();
    //   that.userDetails.uid = snapshot.key;
    //   that.userDetails.feedback = feedback;
    //   that.userDetails.feedbackReply = '';
    //   console.log(that.userDetails);
    //   // this.saveFeedbackToDB(that.userDetails);
    //   firebase.database().ref('feedback/').push(that.userDetails)
    //     .then((v) => {
    //       console.log('saved', v);
    //     })

    // });

  }

}
