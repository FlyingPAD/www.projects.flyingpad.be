import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectShellComponent } from '../../components/project-shell/project-shell.component';
import { DisplayService } from '../../services/display.service';
import { FullScreenService } from '../../services/full-screen.service';
import { ImageUrlService } from '../../services/image-url.service';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { SupportedLanguages } from '../../enumerations/supported-languages';
import { Theme } from '../../enumerations/themes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [CommonModule, FormsModule, TranslateModule, ProjectShellComponent]
})
export class SettingsComponent {
  #languageService = inject(LanguageService);
  #displayService = inject(DisplayService);
  #fullScreenService = inject(FullScreenService);
  #themeService = inject(ThemeService);
  #imageUrlService = inject(ImageUrlService);

  public currentLanguage = this.#languageService.currentLanguage;
  public displayInfos = this.#displayService.displayInfo;
  public isFullScreen = this.#fullScreenService.isFullscreen;
  public currentTheme = this.#themeService.currentTheme;
  public Theme = Theme;
  public isLanguageMenuON = false;
  public supportedLanguages: string[] = Object.values(SupportedLanguages);

  get themeKeys(): (keyof typeof Theme)[] {
    return Object.keys(this.Theme) as Array<keyof typeof Theme>;
  }

  public currentThemeKey(): keyof typeof Theme {
    return Object.keys(this.Theme).find(
      key => this.Theme[key as keyof typeof Theme] === this.currentTheme()
    ) as keyof typeof Theme;
  }

  public changeTheme(selectedThemeKey: keyof typeof Theme): void {
    this.#themeService.setTheme(this.Theme[selectedThemeKey]);
  }

  public switchLanguage(language: string): void {
    this.#languageService.setLanguage(language);
    this.isLanguageMenuON = false;
  }

  public toggleFullScreen(): void {
    this.#fullScreenService.toggleFullscreen();
  }

  public async factorySettings(): Promise<void> {
    await this.#fullScreenService.exitFullscreen();
    this.#languageService.resetLanguage();
    this.#themeService.setDefaultTheme();
  }

  public languageMenuToggle(): void {
    this.isLanguageMenuON = !this.isLanguageMenuON;
  }

  public getImageURL(theme: boolean, folderName: string, imageName: string, imageExtension: string): string {
    return theme
      ? this.#imageUrlService.getImageURL(folderName, imageName, imageExtension)
      : this.#imageUrlService.getImageURLNoTheme(folderName, imageName, imageExtension);
  }
}
