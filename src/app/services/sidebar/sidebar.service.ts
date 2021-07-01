import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Favoritos',      
      type: 'header'
    },
    {
      title: 'Cambio de Clave con un titulo bien pero bien largo para que se trunque',
      icon: 'fa fa-unlock-alt',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Favoritos',
      icon: 'fa fa-star',
      active: false,
      type: 'simple'
    },
    {
      title: 'Procesar Dctos Electronicos',
      icon: 'fa fa-file-alt',
      active: false,
      type: 'simple'
    },
    {
      title: 'Modulo General',
      type: 'header'
    },
    {
      title: 'Usuarios',
      icon: 'fa fa-users',
      active: false,
      type: 'dropdown',      
      submenus: [
        {
          title: 'Mantenimiento de Usuarios'                    
        },
        {
          title: 'Cambio de Clave'
        },
        {
          title: 'Favoritos'
        }
      ]
    },
    {
      title: 'Seguridades',
      icon: 'fa fa-key',
      active: false,
      type: 'dropdown',      
      submenus: [
        {
          title: 'Mantenimiento de Perfil',
        },
        {
          title: 'Permisos x opcion'
        },
        {
          title: 'Objetos x opcion'
        },
        {
          title: 'Permisos x objetos'
        }
      ]
    },
    {
      title: 'Parametros Generales',
      icon: 'fa fa-indent',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Mantenimiento de Empresas',
        },
        {
          title: 'Mantenimiento de Sucursales'
        },
        {
          title: 'Configuracion de Correo'
        }
      ]
    },
    {
      title: 'Facturacion Electronica',
      type: 'header'
    },    
    {
      title: 'Parametros',
      icon: 'fa fa-indent',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Ambiente',
        },
        {
          title: 'Parametros FE'
        },
        {
          title: 'Parametros Batch'
        },
        {
          title: 'Permisos Tipos Documentos'
        },
        {
          title: 'Mantenimiento de Correos'
        },
        {
          title: 'Mantenimiento de Correo Errores'
        }
      ]
    },
    {
      title: 'Transacciones',
      icon: 'fas fa-cogs',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Procesa Documentos Electronicos',
        }        
      ]
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
