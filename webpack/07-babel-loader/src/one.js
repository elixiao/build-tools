import {Two} from './two'

export class One  {
    constructor(x,y){
        this.x = x
        this.y = y
    }
    add() {
        return new Two(1).add(this.x,this.y)
    }
}