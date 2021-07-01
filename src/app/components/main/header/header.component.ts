import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './../../../services/login/login.service';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

import { SidebarService } from './../../../services/sidebar/sidebar.service';

import ISesion from './../../../model/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  iSesion$: Observable<ISesion>;
  sesion: ISesion = {};
  displayWait: boolean = false;

  constructor(
    private sidebarservice: SidebarService,
    private loginService: LoginService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    this.iSesion$ = this.loginService.iSesion;
  }

  ngOnInit(): void {
  }

  onClickBtnSalir() {
    this.iSesion$.subscribe(sesion => {
      this.sesion.id_sesion = sesion.id_sesion;
      this.sesion.id_usuario = sesion.id_usuario
    });

    this.confirmationService.confirm({
      header: 'Mensaje del Sistema',
      message: 'Desea salir del Sistema ?',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        const postData = new FormData();

        postData.append('id_sesion', this.sesion.id_sesion.toString());
        postData.append('id_usuario', this.sesion.id_usuario.toString());
        postData.append('action', 'cerrarSesionActual');

        this.displayWait = true;

        this.loginService.logout(postData).subscribe(
          data => {
            this.displayWait = false;
            this.router.navigate(['/login']);
            return true;
          },
          error => {
            this.displayWait = false;
            return false;
          }
        );
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
