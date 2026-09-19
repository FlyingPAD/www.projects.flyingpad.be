import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { StorageProperties } from '../enumerations/storage-properties';
import { Theme } from '../enumerations/themes';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  #storageService = inject(StorageService);
  readonly #defaultTheme = Theme.Default;
  readonly #themeClasses = Object.values(Theme);

  #currentTheme = new BehaviorSubject<Theme>(this.#defaultTheme);
  public currentTheme = toSignal(this.#currentTheme, { initialValue: this.#defaultTheme });

  constructor() {
    const storedTheme = this.#storageService.getItem(StorageProperties.Theme) as Theme | null;
    this.setTheme(storedTheme && this.isValidTheme(storedTheme) ? storedTheme : this.#defaultTheme);
  }

  private isValidTheme(theme: string): boolean {
    return Object.values(Theme).includes(theme as Theme);
  }

  public setTheme(theme: Theme): void {
    document.body.classList.remove(...this.#themeClasses);
    document.documentElement.classList.remove(...this.#themeClasses);

    document.body.classList.add(theme);
    document.documentElement.classList.add(theme);

    this.#storageService.setItem(StorageProperties.Theme, theme);
    this.#currentTheme.next(theme);
  }

  public setDefaultTheme(): void {
    this.setTheme(this.#defaultTheme);
  }
}
