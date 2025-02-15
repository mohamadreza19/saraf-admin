import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet, Event } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterOutlet, FooterComponent, CdkScrollable, ScrollingModule],
})
export class LayoutComponent implements AfterViewInit {
  private mainContent: HTMLElement | null = null;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (this.mainContent) {
          this.mainContent!.scrollTop = 0;
        }
      }
    });
  }
  ngAfterViewInit(): void {
    // document.getElementById('main-content')?.addEventListener('scroll', (e) => {
    //   console.log(e);
    // });
  }
}
