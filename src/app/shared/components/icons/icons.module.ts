import { NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

import { matSearchOutline } from '@ng-icons/material-icons/outline';

@NgModule({
  imports: [
    NgIconsModule.withIcons({
      matSearchOutline,
    }),
  ],
  exports: [NgIconsModule],
})
export class IconsModule {}
