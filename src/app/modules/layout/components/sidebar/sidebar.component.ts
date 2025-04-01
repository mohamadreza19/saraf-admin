import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../services/menu.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Theme } from 'src/app/core/models/theme.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, NgFor, AngularSvgIconModule, SidebarMenuComponent, RouterLink, RouterLinkActive],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;
  public faAppName = '';
  ip!: string;

  languages = [
    {
      title: '🇮🇷 فارسی',
      link: '/fa',
    },
    {
      title: '🇺🇸 English',
      link: '/en',
    },
  ];
  constructor(public menuService: MenuService, http: HttpClient, @Inject(LOCALE_ID) public localeId: string) {
    lastValueFrom(http.get<{ ip: string }>('_ip')).then((res) => (this.ip = res.ip));
  }

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
  isLinkIncludesLocale(link: string, localeId: string) {
    return link.includes(localeId);
  }
}
