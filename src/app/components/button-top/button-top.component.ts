import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../enumerations/themes';

@Component({
  selector: 'app-button-top',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button-top.component.html',
  styleUrl: './button-top.component.scss'
})
export class ButtonTopComponent {
  #themeService = inject(ThemeService)
  currentTheme = this.#themeService.currentTheme
  public showButton: boolean = false

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const threshold = 100
    const currentScrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
    this.showButton = currentScrollPosition > threshold
  }

  public toTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  public getImageURL(): string {
    let URL: string = 'assets/button-top/arrow-'
    let theme: Theme = this.currentTheme() ?? Theme.Default
    let imageExtension: string = '.svg'

    return `${URL}${theme}${imageExtension}`
  }
}