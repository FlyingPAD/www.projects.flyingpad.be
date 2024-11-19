export class Character {
    id: number
    name: string
    fileName: string
    color: string
    assignedButton: string = ''
    entering: boolean = false
    exiting: boolean = false

    constructor(
        id: number,
        name: string,
        fileName: string = 'neutral-001',
        color: string = 'black'
    ) {
        this.id = id
        this.name = name
        this.fileName = fileName
        this.color = color
    }

    public resetCharacter(): void {
    this.assignedButton = ''
    this.color = 'black'
    this.fileName = 'neutral-001'
    }
}