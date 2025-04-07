import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { BottomBarComponent } from '../../components/bottom-bar/bottom-bar.component'
import { BottomIconBackComponent } from '../../components/bottom-bar-icons/bottom-icon-back/bottom-icon-back.component'
import { BottomToggleEntityInfoComponent } from '../../components/bottom-bar-icons/bottom-toggle-entity-info/bottom-icon-about.component'
import { BottomIconSettingsComponent } from '../../components/bottom-bar-icons/bottom-icon-settings/bottom-icon-settings.component'
import { SpacerComponent } from '../../components/spacer/spacer.component'
import { BottomIconToTopComponent } from '../../components/bottom-bar-icons/bottom-icon-to-top/bottom-icon-to-top.component'
import { CountdownEvent } from '../../interfaces/countdown-event'

@Component({
  selector: 'app-countdown',
  imports: [CommonModule, FormsModule, BottomBarComponent, BottomIconBackComponent, BottomToggleEntityInfoComponent, BottomIconSettingsComponent, SpacerComponent, BottomIconToTopComponent],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  #intervalId: ReturnType<typeof setInterval> | undefined
  #targetTime!: Date

  public countdown!: { months: number, days: number, hours: number, minutes: number, seconds: number }
  public countdownMessage: string = 'Time remaining :'
  public currentEventName: string | null = null
  public birthday!: Date | undefined

  public events: CountdownEvent[] = [
    { id: 1, name: 'New Year', thumbnail: 'newyear.webp', date: new Date('2025-01-01'), isActive: false },
    { id: 2, name: 'Valentine\'s Day', thumbnail: 'valentines.webp', date: new Date('2025-02-14'), isActive: false },
    { id: 3, name: 'Carnival', thumbnail: 'carnival.webp', date: new Date('2025-03-04'), isActive: false },
    { id: 4, name: 'Halloween', thumbnail: 'halloween.webp', date: new Date('2024-10-31'), isActive: false },
    { id: 5, name: 'Christmas', thumbnail: 'christmas.webp', date: new Date('2024-12-25'), isActive: false }
  ]

  public ngOnInit(): void {
    this.#updateEventDates()
    this.#setNextActiveEvent()
  }

  public ngOnDestroy(): void {
    this.#stopCountDown()
  }

  #updateEventDates(): void {
    const currentYear = new Date().getFullYear()
    const now = Date.now()

    this.events = this.events.map(event => {
      const eventDate = new Date(event.date)
      eventDate.setFullYear(currentYear)

      if (eventDate.getTime() < now) eventDate.setFullYear(currentYear + 1)
      return { ...event, date: new Date(eventDate) }
    })
  }

  #setNextActiveEvent(): void {
    const now = Date.now()
    const nextEvent = this.events
      .filter(event => event.date.getTime() > now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

    if (nextEvent) this.#setTargetDate(nextEvent.date, nextEvent.id, nextEvent.name)
  }

  #setTargetDate(targetDate: Date, eventId: number, eventName: string): void {
    this.#targetTime = targetDate
    this.currentEventName = eventName
    this.events = this.events.map(event => ({
      ...event,
      isActive: event.id === eventId
    }))
    this.#updateCountdown()
    if (this.#intervalId) clearInterval(this.#intervalId)
    this.#startCountDown()
  }

  #updateCountdown(): void {
    const now = new Date()
    const diff = this.#targetTime.getTime() - now.getTime()
    const absDiff = Math.abs(diff)
    this.countdownMessage = diff < 0 ? 'Time since :' : 'Time remaining :'
    const totalDays = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    const months = Math.floor(totalDays / 30)
    const days = totalDays % 30
    this.countdown = {
      months,
      days,
      hours: Math.floor((absDiff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((absDiff / (1000 * 60)) % 60),
      seconds: Math.floor((absDiff / 1000) % 60)
    }
  }

  #startCountDown(): void {
    this.#intervalId = setInterval(() => this.#updateCountdown(), 1000)
  }

  #stopCountDown(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId)
      this.#intervalId = undefined
    }
  }

  public handleDateChange(): void {
    if (this.birthday) this.#setTargetDate(new Date(this.birthday), -1, 'User Selected Date')
    else this.#setNextActiveEvent()
  }

  public handleEventClick(targetDate: Date, eventId: number, eventName: string): void {
    this.birthday = undefined
    this.#setTargetDate(targetDate, eventId, eventName)
  }
}