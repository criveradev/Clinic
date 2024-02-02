import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DataService } from 'src/app/shared/data/data.service';
import { MenuItem, SideBarData } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { SideBarService } from 'src/app/shared/side-bar/side-bar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  base = '';
  page = '';
  currentUrl = '';
  public classAdd = false;

  public multilevel: Array<boolean> = [false, false, false];

  public routes = routes;
  public sidebarData: Array<SideBarData> = [];
  public user: any;

  constructor(private data: DataService, private router: Router, private sideBar: SideBarService, public AuthService: AuthService) {
    // this.user = this.AuthService.user;// Obtenemos la informacion del usuario autenticado.
    let USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');

    if (this.user && this.user.roles.includes('Super-Admin')) {
      //Opciones del menu sidebar.
      this.sidebarData = this.data.sideBar;
    } else {
      // Filtrado
      let permissions = this.user.permissions;

      let SIDE_BAR_GENERALS: any = [];
      this.data.sideBar.forEach((side: any) => { // Iteramos todos los elementos del sidebar, nos encontramos con el objeto side.
        let SIDE_BAR: any = [];
        side.menu.forEach((menu_selected: any) => {// Iteramos todos los elementos del menu, nos encontramos con el objeto seleccionado.
          let SUB_MENU = menu_selected.subMenus.filter((submenu: any) => permissions.includes(submenu.permission) && submenu.show_nav)
          if (SUB_MENU.length > 0) {
            menu_selected.subMenus = SUB_MENU;
            SIDE_BAR.push(menu_selected);
          }
          if (SIDE_BAR.length > 0) {
            side.menu = SIDE_BAR;
            SIDE_BAR_GENERALS.push(side);

          }
        });
      })
      //Opciones del menu sidebar.
      this.sidebarData = this.data.sideBar;
    }


    router.events.subscribe((event: object) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
  }

  public expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.sidebarData.map((mainMenus: SideBarData) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }
  private getRoutes(route: { url: string }): void {
    const bodyTag = document.body;

    bodyTag.classList.remove('slide-nav')
    bodyTag.classList.remove('opened')
    this.currentUrl = route.url;

    const splitVal = route.url.split('/');


    this.base = splitVal[1];
    this.page = splitVal[2];
  }
  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

}
