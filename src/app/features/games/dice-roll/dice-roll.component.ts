import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dice-roll',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './dice-roll.component.html',
  styleUrls: ['./dice-roll.component.scss']
})
export class DiceRollComponent 
{
  // ----------------------------------------------------------------
  // - Properties :

  title : boolean = true
  toggleTitle(){
    this.title = !this.title
  }
  intro! : boolean

  messageFemale! : string | undefined
  messageMale! : string | undefined

  currentDiceRoll! : number

  turn! : boolean

  diceRollVictoryResult! : number | undefined

  resultFemale! : number | undefined
  resultMale! : number | undefined

  messageResult! : string

  victoryF! : boolean
  victoryM! : boolean

  imageFName! : string
  imageMName! : string

  emptyF! : string
  emptyM! : string
  overlayF! : string
  overlayM! : string
  
  // ----------------------------------------------------------------
  // - Methods :

  ngOnInit(): void 
  {
    this.intro = true
    this.victoryF = false
    this.victoryM = false
    this.messageFemale = "Ready to play ?"
    this.messageMale = "Of course !"
    this.imageFName = "start"
    this.imageMName = "start"
    this.emptyF = "empty"
    this.emptyM = "empty"
    this.overlayF = "empty"
    this.overlayM = "empty"
  }

  femaleStartRoll()
  {
    this.resultFemale = this.diceRoll(6) + 1
    this.messageMale = "Prepare yourself !!"
    this.imageMName = "draw"
    if(this.resultFemale >= 3)
    {
      this.imageFName = "up"
      this.messageFemale = "Yeah !"
    }
    else 
    {
      this.imageFName = "down"
      this.messageFemale = "Damn !!"
    }
  }
  femaleStartRollMobile()
  {
    this.femaleStartRoll()
  }

  maleStartRoll()
  {
    this.resultMale = this.diceRoll(6) + 1
    if(this.resultMale >= 3)
    {
      this.imageMName = "up"
      this.messageMale = "Good !"
    }
    else
    {
      this.imageMName = "down"
      this.messageMale = "Shit !"
    } 
    this.diceRollCheck()
  }
  maleStartRollMobile()
  {
    this.maleStartRoll()
  }

  diceRoll(max : number)
  {
    this.currentDiceRoll = Math.floor(Math.random() * max);
    return this.currentDiceRoll
  }

  diceRollCheck()
  {
    if(this.resultFemale != undefined && this.resultMale != undefined)
    {
      if(this.resultFemale > this.resultMale)
      {
        this.diceRollVictoryResult = 1
        this.messageFemale = "Victoryyy !"
        this.messageMale = "Damn !"
        this.messageResult = "Girls Win"
        this.imageFName = "victory"
        this.imageMName = "defeat"
        this.emptyF = "won"
        this.emptyM = "empty"
        this.overlayF = "overlay"
        this.overlayM = "empty"
      } 
      if(this.resultFemale < this.resultMale)
      {
        this.diceRollVictoryResult = 2
        this.messageFemale = "Sob ..."
        this.messageMale = "Great !"
        this.messageResult = "Boys Win"
        this.imageFName = "defeat"
        this.imageMName = "victory"
        this.emptyM = "won"
        this.emptyF = "empty"
        this.overlayF = "empty"
        this.overlayM = "overlay"
      } 
      if(this.resultFemale == this.resultMale)
      {
        this.diceRollVictoryResult = 3
        this.messageFemale = "What ?"
        this.messageMale = "..."
        this.messageResult = "DRAW Game"
        this.imageFName = "draw"
        this.imageMName = "draw"
      } 
    }
  }

  diceRollRestart()
  {
    this.resultFemale = undefined
    this.resultMale = undefined
    this.diceRollVictoryResult = undefined
    this.messageMale = undefined
    this.messageFemale = "Wanna play again ?"
    this.imageFName = "start"
    this.imageMName = "start"
    this.emptyM = "empty"
    this.emptyF = "empty"
    this.overlayF = "empty"
    this.overlayM = "empty"
  }

  getDiceImagePath(result: number | undefined): string {
    if (result === undefined) return ''
    return `assets/dice_roll/dice-${result}.png`
  }
}