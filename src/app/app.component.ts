import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Observable } from 'rxjs';
import { SidebarService } from './services/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'plantilla-sidebar';
  isLoggedIn$: Observable<boolean>;

  servidor: any;

  isDisplayWaitPermiso$: Observable<boolean>;

  constructor(
    private loginService: LoginService,
    public sidebarservice: SidebarService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn$ = this.loginService.isLoggedIn;    
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
