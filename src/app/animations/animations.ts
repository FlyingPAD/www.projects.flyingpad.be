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
  transition('countdown => leapYear, countdown => convertors, countdown => chordWheel, countdown => circleOfFifths', slideToLeft),
  transition('leapYear => convertors, leapYear => chordWheel, leapYear => circleOfFifths', slideToLeft),
  transition('convertors => chordWheel, convertors => circleOfFifths', slideToLeft),
  transition('chordWheel => circleOfFifths', slideToLeft),
  transition('higherOrLower => diceRoll, higherOrLower => trainer', slideToLeft),
  transition('diceRoll => trainer', slideToLeft),
  transition('keyboard => diapason, keyboard => tuner', slideToLeft),
  transition('diapason => tuner', slideToLeft),
  
  transition('leapYear => countdown, convertors => countdown, chordWheel => countdown, circleOfFifths => countdown', slideToRight),
  transition('convertors => leapYear, chordWheel => leapYear, circleOfFifths => leapYear', slideToRight),
  transition('chordWheel => convertors, circleOfFifths => convertors', slideToRight),
  transition('circleOfFifths => chordWheel', slideToRight),
  transition('diceRoll => higherOrLower, trainer => higherOrLower', slideToRight),
  transition('trainer => diceRoll', slideToRight),
  transition('diapason => keyboard, tuner => keyboard', slideToRight),
  transition('tuner => diapason', slideToRight),
  // transition('* => countdown, * => diceRoll, * => tuner', slideToRight),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('0ms', style({ opacity: 1 })) // No animation on leave
  ])
])