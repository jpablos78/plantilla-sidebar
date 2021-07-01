import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routes.module';

import { PrimeNGModule } from './png';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { LoginService } from './services/login/login.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PrimeNGModule,
    AppRoutesModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule
  ],
  providers: [
    LoginService,
    MessageService,
    ConfirmationService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
