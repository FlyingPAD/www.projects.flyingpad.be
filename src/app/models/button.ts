export class Button {
    name: string
    color: string
    fileName: string

    constructor(name: string, color: string = 'gray', fileName: string = 'default') {
        this.name = name
        this.color = color
        this.fileName = fileName
    }
}