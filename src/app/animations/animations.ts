import { trigger, state, style, animate, transition, query, group } from '@angular/animations';

const slideToRight = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    })
  ], { optional: true }),
  query(':enter', [
          style({ left: '-100%' })
  ], { optional: true }),
  query(':leave', [
    style({ left: '0%' })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ], { optional: true })
  ])
]

const slideToLeft = [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0
    })
  ], { optional: true }),
  query(':enter', [
    style({ left: '100%' })
  ], { optional: true }),
  query(':leave', [
    style({ left: '0%' })
  ], { optional: true }),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%' }))
    ], { optional: true }),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ], { optional: true })
  ])
]

export const slideInAnimation = trigger('routeAnimations', [
  transition('countdown => leapYear, countdown => convertors, countdown => chordWheel, countdown => circleOfFifths', slideToRight),
  transition('leapYear => convertors, leapYear => chordWheel, leapYear => circleOfFifths', slideToRight),
  transition('convertors => chordWheel, convertors => circleOfFifths', slideToRight),
  transition('chordWheel => circleOfFifths', slideToRight),
  transition('higherOrLower => diceRoll, higherOrLower => trainer', slideToRight),
  transition('diceRoll => trainer', slideToRight),
  transition('keyboard => diapason, keyboard => tuner', slideToRight),
  transition('diapason => tuner', slideToRight),
  
  transition('leapYear => countdown, convertors => countdown, chordWheel => countdown, circleOfFifths => countdown', slideToLeft),
  transition('convertors => leapYear, chordWheel => leapYear, circleOfFifths => leapYear', slideToLeft),
  transition('chordWheel => convertors, circleOfFifths => convertors', slideToLeft),
  transition('circleOfFifths => chordWheel', slideToLeft),
  transition('diceRoll => higherOrLower, trainer => higherOrLower', slideToLeft),
  transition('trainer => diceRoll', slideToLeft),
  transition('diapason => keyboard, tuner => keyboard', slideToLeft),
  transition('tuner => diapason', slideToLeft),
  // transition('* => countdown, * => diceRoll, * => tuner', slideToRight),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0ms', style({ opacity: 1 })) // No animation on leave
  ])
])