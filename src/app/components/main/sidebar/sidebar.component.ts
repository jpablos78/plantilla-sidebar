import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { LoginService } from './../../../services/login/login.service';
import { SidebarService } from './../../../services/sidebar/sidebar.service';
import { Global } from './../../../common/global/global';

import IMenuFavoritos from './../../../model/models';
import ISesion from './../../../model/models';

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
  sesion: ISesion = {};
  displayWait: boolean = false;

  iMenu$: Observable<any>;
  iMenuFavoritos$: Observable<IMenuFavoritos>;
  iSesion$: Observable<ISesion>;

  constructor(
    private loginService: LoginService,
    public sidebarservice: SidebarService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private global: Global,
  ) {
    this.iSesion$ = this.loginService.iSesion;
    this.iMenu$ = this.loginService.iMenu;
    this.iMenuFavoritos$ = this.loginService.iMenuFavoritos;

    this.rutaImagen = global.baseUrl + 'imagenes/usuarios/';

    this.iSesion$.subscribe(sesion => {
      this.rutaImagen = this.rutaImagen + sesion.imagen;
      this.perfil = sesion.descripcion_perfil;
      this.nombres = sesion.nombre_apellido;
    });

    this.iMenu$.subscribe(menu => {
      this.menus = menu;
    });
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
