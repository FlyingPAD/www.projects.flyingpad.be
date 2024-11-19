import { Character } from "../models/character";
import { Button } from "../models/button";

export const BUTTONS: Button[] = [
    new Button('Voice', '#99f877', 'Voice'),
    new Button('Kick', '#794fcd', 'Kick'),
    new Button('Snare', '#84f428', 'Snare'),
    new Button('HH', '#173abc', 'HH'),
    new Button('Reverse', '#bd2fde', 'Reverse'),
    new Button('Crash', '#e67312', 'Crash'),
    new Button('Shaker Line', '#74b6d1', 'ShakerLine'),
    new Button('Damage', '#ff45a1', 'Damage'),
    new Button('Waterphone', '#5f8d3b', 'Waterphone'),
    new Button('CowBell', '#d477e3', 'CowBell'),
    new Button('Bass1', '#a1398f', 'Bass1'),
    new Button('Bass2', '#a1268f', 'Bass2'),
    new Button('Pad', '#ef7323', 'Pad'),
    new Button('Bells', '#11a4d6', 'Bells'),
    new Button('Piano', '#f0d321', 'Piano'),
    new Button('Pizzicato', '#c47390', 'Pizzicato'),
    new Button('Lead', '#387af5', 'Lead'),
    new Button('Arp', '#f5a638', 'Arp'),
    new Button('Chip', '#81f789', 'Chip'),
    new Button('Whistle', '#ffb242', 'Whistle'),
    new Button('SampleAnael', '#42f2cb', 'SampleAnael'),
]

export const CHARACTERS: Character[] = [
    new Character(1, 'neutral', 'neutral-001', 'black'),
    new Character(2, 'neutral', 'neutral-001', 'black'),
    new Character(3, 'neutral', 'neutral-001', 'black'),
    new Character(4, 'neutral', 'neutral-001', 'black'),
    new Character(5, 'neutral', 'neutral-001', 'black'),
    new Character(6, 'neutral', 'neutral-001', 'black'),
    new Character(7, 'neutral', 'neutral-001', 'black'),
]