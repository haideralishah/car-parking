import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ButtonsModule } from 'ng2-bootstrap';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DataService } from './data.service';
import { SigninComponent } from './signin/signin.component';
import { ViewParkingComponent } from './view-parking/view-parking.component';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { ViewBookingAdminComponent } from './view-booking-admin/view-booking-admin.component';
import { ViewUserAdminComponent } from './view-user-admin/view-user-admin.component';
import { ViewFeedbackAdminComponent } from './view-feedback-admin/view-feedback-admin.component';

import { BookSlotComponent } from './book-slot/book-slot.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'viewparking', component: ViewParkingComponent },
  { path: 'bookparking', component: BookParkingComponent },
  { path: 'viewbooking', component: ViewBookingComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'viewbookingadmin', component: ViewBookingAdminComponent },
  { path: 'viewuseradmin', component: ViewUserAdminComponent },
  { path: 'viewfeedbackadmin', component: ViewFeedbackAdminComponent },
  { path: 'bookslot/:location', component: BookSlotComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    NavigationComponent,
    SigninComponent,
    ViewParkingComponent,
    ViewBookingAdminComponent,
    BookParkingComponent,
    ViewBookingComponent,
    FeedbackComponent,
    ViewUserAdminComponent,
    ViewFeedbackAdminComponent,
    BookSlotComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
