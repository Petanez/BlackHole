

class SpaceState {
    constructor(blackHole, objects = []) {
        this.blackHole = {
            d: blackHole.d,
            pos: blackHole.pos
        }
        this.objects = objects
    }
    update(objs) {
        // console.log(objs.length)
        // console.log("Updating")
        let bHX = this.blackHole.pos.x
        let bHY = this.blackHole.pos.y
        let newObjects = objs.map(obj => {
            let speed = 2
            let distFromCentreX = Math.abs(bHX - obj.pos.x)
            let distFromCentreY = Math.abs(bHY - obj.pos.y)
            let directionX = bHX - obj.pos.x < 0 ? "-" : "+"
            let directionY = bHY - obj.pos.y < 0 ? "-" : "+"


            let SPEED_X = Math.floor(speed * Math.sqrt(distFromCentreX))
            let SPEED_Y = Math.floor(speed * Math.sqrt(distFromCentreY))
            // let SPEED_X = 10
            // let SPEED_Y = 10
            SPEED_X = directionX == "-" ? -SPEED_X : SPEED_X
            SPEED_Y = directionY == "-" ? -SPEED_Y : SPEED_Y
            obj.pos.x = obj.pos.x + SPEED_X
            obj.pos.y = obj.pos.y + SPEED_Y
            return obj
        })

        // console.log(newObjects)
        return new SpaceState(this.blackHole, newObjects)
    }

}

SpaceState.random = function(n = 5) {
    let objects = []
    for (let i = 0; i < n; i++) {
        let randomD = Math.floor(Math.random() * 30) + 2
        let randomX = Math.floor(Math.random() * 1090)
        let randomY = Math.floor(Math.random() * 681)
        objects.push({d: randomD, pos: { x: randomX, y: randomY}})
    }
    // First parameter is the blakchole center
    return new SpaceState({d: 100, pos: {x:884, y:288}}, objects)
}

document.addEventListener("click", (e) => {
    // console.log(e.x)
    // console.log(e.y)
    let node = document.querySelector("#blackHole")
    console.log(node.height)
    console.log()
})