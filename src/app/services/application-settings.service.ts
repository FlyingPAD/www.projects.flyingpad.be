import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';
import { FullScreenService } from './full-screen.service';
import { BehaviorSubject } from 'rxjs';
import { ApplicationSettings } from '../models/application-settings';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ApplicationSettingsService {
  #storageService = inject(StorageService)
  #translate = inject(TranslateService)
  #fullScreenService = inject(FullScreenService)

  #settings = new BehaviorSubject<ApplicationSettings>(
    new ApplicationSettings(this.#storageService.getItem<Partial<ApplicationSettings>>('applicationSettings') || {})
  )
  settings = toSignal(this.#settings.asObservable())

  initializeSettings(): void {
    const initialSettings = this.#settings.getValue()

    initialSettings.displayMode = this.detectDisplayMode()
    initialSettings.windowWidth = window.innerWidth
    initialSettings.windowHeight = window.innerHeight

    this.setLanguage(initialSettings.language)

    this.#settings.next(initialSettings)
    this.#storageService.setItem('applicationSettings', initialSettings)
  }
    
  detectDisplayMode(): string {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    return isMobile ? 'Mobile' : 'Desktop'
  }

  updateSettings(settings: Partial<ApplicationSettings>): void {
    const currentSettings = this.#settings.getValue()
    const updatedSettings = { ...currentSettings, ...settings }
    this.#settings.next(updatedSettings)
    this.#storageService.setItem('applicationSettings', updatedSettings)
  }

  async toggleFullscreen(): Promise<void> {
    const isFullscreen = await this.#fullScreenService.toggleFullscreen()
    this.updateSettings({
      fullscreen: isFullscreen,
      windowWidth: isFullscreen ? window.screen.width : window.innerWidth,
      windowHeight: isFullscreen ? window.screen.height : window.innerHeight
    })
  }

  setLanguage(language: string): void {
    this.#translate.setDefaultLang(language)
    this.#translate.use(language)
    this.updateSettings({ language })
  }

  async factorySettings(): Promise<void> {
    await this.#fullScreenService.exitFullscreen()
    const defaultSettings = new ApplicationSettings()

    this.updateSettings({
      language: defaultSettings.language,
      fullscreen: false,
      displayMode: this.detectDisplayMode(),
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    })
    this.setLanguage(defaultSettings.language)
  }
}