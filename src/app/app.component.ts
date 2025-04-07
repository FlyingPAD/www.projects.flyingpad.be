import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayService } from './services/display.service';
import { FullScreenService } from './services/full-screen.service';
import { LanguageService } from './services/language.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  #languageService = inject(LanguageService)
  #displayService = inject(DisplayService)
  #fullScreenService = inject(FullScreenService)
  #themeService = inject(ThemeService)
}