import { computed, Inject, Injectable, signal } from '@angular/core';
import { Theme } from '../models/theme.model';
import { effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from './local-storage.service';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({ mode: 'light', color: 'blue' });
  private docDirection = signal(this.document.dir || 'ltr');
  public isLTR = computed(() => this.docDirection() === 'ltr');

  constructor(
    public pg: PlatformService,
    @Inject(DOCUMENT) private document: Document,
    private localStorageService: LocalStorageService,
  ) {
    this.loadTheme();
    effect(() => {
      this.setTheme();
    });
  }

  private loadTheme() {
    const theme = this.localStorageService.getItem('theme');
    if (theme) {
      this.theme.set(JSON.parse(theme));
    }
  }

  private setTheme() {
    this.localStorageService.setItem('theme', JSON.stringify(this.theme()));
    this.setThemeClass();
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }
  public get isDocDirectionLeft(): boolean {
    console.log({
      direction: this.document.dir,
    });
    return this.document.dir === 'left';
  }

  private setThemeClass() {
    if (this.pg.isBrowser) {
      document.querySelector('html')!.className = this.theme().mode;
      document.querySelector('html')!.setAttribute('data-theme', this.theme().color);
    }
  }
}
