import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonBackComponent } from '../../components/button-back/button-back.component';
import { ThemeService } from '../../services/theme.service';
import { Theme } from '../../enumerations/themes';
import { DisplayService } from '../../services/display.service';
import { FullScreenService } from '../../services/full-screen.service';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonBackComponent, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  #languageService = inject(LanguageService);
  #displayService = inject(DisplayService);
  #fullScreenService = inject(FullScreenService);
  #themeService = inject(ThemeService);

  currentLanguage = this.#languageService.currentLanguage;
  displayInfos = this.#displayService.displayInfo;
  isFullScreen = this.#fullScreenService.isFullscreen;
  Theme = Theme;
  currentTheme = this.#themeService.currentTheme;

  // Récupérer la liste des clés de thèmes
  get themeKeys(): (keyof typeof Theme)[] {
    return Object.keys(this.Theme) as Array<keyof typeof Theme>;
  }

  // Retourne la clé du thème actuellement sélectionné
  currentThemeKey(): keyof typeof Theme {
    const currentThemeValue = this.#themeService.currentTheme();
    return Object.keys(this.Theme).find(
      key => this.Theme[key as keyof typeof Theme] === currentThemeValue
    ) as keyof typeof Theme;
  }

  // Méthode pour changer le thème en fonction de la sélection
  changeTheme(selectedThemeKey: keyof typeof Theme): void {
    const selectedTheme = this.Theme[selectedThemeKey];
    this.#themeService.setTheme(selectedTheme);
  }

  switchLanguage(language: string): void {
    this.#languageService.setLanguage(language);
  }

  toggleFullScreen(): void {
    this.#fullScreenService.toggleFullscreen();
  }

  async factorySettings(): Promise<void> {
    await this.#fullScreenService.exitFullscreen();
    this.#languageService.resetLanguage();
    this.#themeService.setDefaultTheme();
  }
}