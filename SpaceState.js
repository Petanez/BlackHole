
class SpaceState {
    constructor(blackHole, objects = []) {
        this.blackHole = {
            d: blackHole.d,
            pos: blackHole.pos
        }
        this.objects = objects
    }
    
    update(objs) {
        console.log(objs.length)
        let bHX = this.blackHole.pos.x
        let bHY = this.blackHole.pos.y
        let newObjects = objs.map(obj => {
            let distFromCentreX = Math.abs(bHX - obj.pos.x)
            let distFromCentreY = Math.abs(bHY - obj.pos.y)
            console.log(distFromCentreX, distFromCentreY)
            let SPEED_X = Math.floor(distFromCentreX - 8)
            let SPEED_Y = Math.floor(distFromCentreY - 8)
            
            let directionX = bHX - obj.pos.x < 0 ? "-" : "+"
            let directionY = bHY - obj.pos.y < 0 ? "-" : "+"
            SPEED_X = directionX == "-" ? -SPEED_X : SPEED_X
            SPEED_Y = directionY == "-" ? -SPEED_Y : SPEED_Y
            obj.pos.x = obj.pos.x + SPEED_X
            obj.pos.y = obj.pos.y + SPEED_Y
            if (Math.abs(bHX - obj.pos.x) < 5 && Math.abs(bHY - obj.pos.y) < 5) {
                obj.pos.x = 0
                obj.pos.y = 0
            }
            return obj
        }).filter(obj => {
            return obj.pos.x != 0
            // return Math.abs(bHX - obj.pos.x) > 0 && Math.abs(bHY - obj.pos.y) > 0
        })
        // console.log(newObjects)
        return new SpaceState(this.blackHole, newObjects)
    }

}

SpaceState.random = function(n = 5) {
    let objects = []
    for (let i = 0; i < n; i++) {
        let randomD = Math.floor(Math.random() * 30) + 2
        let randomX = Math.floor(Math.random() * 500)
        let randomY = Math.floor(Math.random() * 400)
        objects.push({d: randomD, pos: { x: randomX, y: randomY}})
    }
    return new SpaceState({d: 50, pos: {x:250, y:200}}, objects)
}