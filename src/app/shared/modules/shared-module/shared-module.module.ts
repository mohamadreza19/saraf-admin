import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagePipe } from 'src/app/core/pipes/error-message.pipe';

@NgModule({
  declarations: [ErrorMessagePipe],
  imports: [CommonModule],
  exports: [ErrorMessagePipe, CommonModule],
})
export class SharedModuleModule {}
