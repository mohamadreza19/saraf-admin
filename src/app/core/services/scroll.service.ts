import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Inject, inject, Injectable } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  constructor() {}

  scrollMainContentToTop() {
    const container = document.getElementById('main-content') as HTMLElement;

    container.scrollTo({
      behavior: 'smooth',
      top: 0,
    });
  }
  scrollIntoView(elId: string) {
    console.log(elId);
    // console.log(this._viewportScroller.);
    const container = document.getElementById('main-content') as HTMLElement;
    const element = document.getElementById(elId) as HTMLElement;

    setTimeout(() => {
      if (element && container) {
        // Get the element's position relative to the document

        // Scroll the container to bring the element into view
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 300);
  }
}
