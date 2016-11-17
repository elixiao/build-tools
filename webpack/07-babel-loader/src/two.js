export class Two {
    constructor(a,b) {
        this.a = a || 5
        this.b = b || 5
    }
    add (x,y) {
        var result = this.a+this.b+x+y
        console.log(result)
        return result
    }
}