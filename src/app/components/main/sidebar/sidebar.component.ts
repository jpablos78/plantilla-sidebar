import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { LoginService } from './../../../services/login/login.service';
import { SidebarService } from './../../../services/sidebar/sidebar.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  isDropup = true;
  rutaImagen = '';
  perfil: string = '';
  nombres: string = '';
  displayWait: boolean = false;

  iMenu$: Observable<any>;


  constructor(
    private loginService: LoginService,
    public sidebarservice: SidebarService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {
    
  }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  onClickBtnSalir() {    
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
