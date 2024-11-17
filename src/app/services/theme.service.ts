import { inject, Injectable } from '@angular/core';
import { Theme } from '../enumerations/themes';
import { StorageService } from './storage.service';
import { StorageProperties } from '../enumerations/storage-properties';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #storageService = inject(StorageService)
  private readonly FADE_DURATION : number = 750
  private readonly DEFAULT_THEME : Theme = Theme.Default

  #currentTheme = new BehaviorSubject<Theme>(this.DEFAULT_THEME)
  currentTheme = toSignal(this.#currentTheme)

  constructor() {
    const storedTheme = this.#storageService.getItem(StorageProperties.Theme) as Theme | null
    if (storedTheme && this.isValidTheme(storedTheme)) {
      this.setTheme(storedTheme)
    } else {
      this.setDefaultTheme()
    }
  }

  private isValidTheme(theme: string): boolean {
    return Object.values(Theme).includes(theme as Theme)
  }

  private storeTheme(theme: Theme): void {
    this.#storageService.setItem(StorageProperties.Theme, theme)
    this.#currentTheme.next(theme)
  }

  public setTheme(theme: Theme): void {
    document.body.classList.add('fade-background')

    setTimeout(() => {
      document.body.classList.remove('dark', 'blue', 'pink', 'green', 'orange')

      document.body.classList.add(theme)

      setTimeout(() => {
        document.body.classList.remove('fade-background')
      }, 100)
    }, this.FADE_DURATION)

    this.storeTheme(theme)
  }

  public setDefaultTheme(): void {
    this.setTheme(this.DEFAULT_THEME)
  }
}