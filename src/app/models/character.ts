export class Character {
    id: number;
    name: string;
    fileName: string;
    bodyFileNames: { [key: string]: string };
    color: string;
    category: string = '';
    assignedButton: string = '';
    entering: boolean = false;
    exiting: boolean = false;
    isMuted: boolean = false;
    isSolo: boolean = false;

    constructor(
        id: number,
        name: string,
        fileName: string = 'neutral-001',
        color: string = 'black',
        category: string,
        bodyFileNames: { [key: string]: string } = {}
    ) {
        this.id = id;
        this.name = name;
        this.fileName = fileName;
        this.color = color;
        this.category = category;
        this.bodyFileNames = bodyFileNames;
    }

    public resetCharacter(): void {
        this.assignedButton = '';
        this.color = 'black';
        this.fileName = 'neutral-001';
        this.isMuted = false;
        this.isSolo = false;
    }
}