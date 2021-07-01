import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './../../../services/login/login.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { SidebarService } from './../../../services/sidebar/sidebar.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayWait: boolean = false;

  constructor(
    private sidebarservice: SidebarService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  onClickBtnSalir() {
    this.confirmationService.confirm({
      header: 'Mensaje del Sistema',
      message: 'Desea salir del Sistema ?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.router.navigate(['/login']);
      }
    });
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
