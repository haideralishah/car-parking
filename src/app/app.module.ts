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


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    NavigationComponent
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
