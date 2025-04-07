import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { DisplayService } from '../../services/display.service';
import { FullScreenService } from '../../services/full-screen.service';
import { ThemeService } from '../../services/theme.service';
import { ImageUrlService } from '../../services/image-url.service';
import { SupportedLanguages } from '../../enumerations/supported-languages';
import { Theme } from '../../enumerations/themes';
import { ButtonTopService } from '../../services/button-top.service';
import { BottomBarComponent } from "../../components/bottom-bar/bottom-bar.component";
import { BottomIconBackComponent } from "../../components/bottom-bar-icons/bottom-icon-back/bottom-icon-back.component";
import { SpacerComponent } from "../../components/spacer/spacer.component";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  imports: [CommonModule, FormsModule, BottomBarComponent, BottomIconBackComponent, SpacerComponent, TranslateModule]
})
export class SettingsComponent implements OnInit, OnDestroy {
  #languageService = inject(LanguageService)
  #displayService = inject(DisplayService)
  #fullScreenService = inject(FullScreenService)
  #themeService = inject(ThemeService)
  #imageUrlService = inject(ImageUrlService)
  #buttonTopService = inject(ButtonTopService)

  public currentLanguage = this.#languageService.currentLanguage
  public displayInfos = this.#displayService.displayInfo
  public isFullScreen = this.#fullScreenService.isFullscreen
  public currentTheme = this.#themeService.currentTheme
  public Theme = Theme
  public isLanguageMenuON: boolean = false
  public supportedLanguages: string[] = Object.values(SupportedLanguages)

  get themeKeys(): (keyof typeof Theme)[] {
    return Object.keys(this.Theme) as Array<keyof typeof Theme>
  }

  ngOnInit(): void {
    this.#buttonTopService.setShowButtonTop(true)
  }

  ngOnDestroy(): void {
    this.#buttonTopService.setShowButtonTop(false)
  }

  public currentThemeKey(): keyof typeof Theme {
    return Object.keys(this.Theme).find(
      key => this.Theme[key as keyof typeof Theme] === this.currentTheme()
    ) as keyof typeof Theme
  }

  public changeTheme(selectedThemeKey: keyof typeof Theme): void {
    const selectedTheme = this.Theme[selectedThemeKey]
    this.#themeService.setTheme(selectedTheme)
  }

  public switchLanguage(language: string): void {
    this.#languageService.setLanguage(language)
    this.isLanguageMenuON = false
  }

  public toggleFullScreen(): void {
    this.#fullScreenService.toggleFullscreen()
  }

  public async factorySettings(): Promise<void> {
    await this.#fullScreenService.exitFullscreen()
    this.#languageService.resetLanguage()
    this.#themeService.setDefaultTheme()
  }

  public languageMenuToggle(): void {
    this.isLanguageMenuON = !this.isLanguageMenuON
  }

  public getImageURL(theme: boolean, folderName: string, imageName: string, imageExtension: string): string {
    if (theme) {
      return this.#imageUrlService.getImageURL(folderName, imageName, imageExtension)
    } else {
      return this.#imageUrlService.getImageURLNoTheme(folderName, imageName, imageExtension)
    }
  }
}