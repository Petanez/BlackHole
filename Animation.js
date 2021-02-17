class Animation {
    constructor(spaceState) {
        this.spaceEl = document.querySelector(".space-container")     
        this.spaceState = spaceState     
        this.blackHole = this.spaceState.blackHole
        this.blackHoleEl = document.createElement("div")
        this.blackHoleEl.style = `background: black; border-radius: 99999px; width: ${this.blackHole.d}px; height: ${this.blackHole.d}px;
                                  position: relative; top: ${this.blackHole.pos.y - this.blackHole.d / 2}px; left: ${this.blackHole.pos.x - this.blackHole.d / 2}px;`
        this.spaceEl.appendChild(this.blackHoleEl)
        this.objectEls = []
        this.turn = 0

        this.createObjects()
        this.schedule()
    }
        
    schedule() {
        if (this.spaceState.objects.length > 0) 
            this.tick()
        else 
            console.log("Done")
    }
        
    createObjects() {
        for (let obj of this.spaceState.objects) {
            let objEl = document.createElement("div")
            objEl.style = `position: absolute; top: ${obj.pos.y}px; left: ${obj.pos.x}px; width: ${obj.d}px; height: ${obj.d}px; background: black; border-radius: 99999px; transition: 1s linear;`
            this.objectEls.push(this.spaceEl.appendChild(objEl))
        }
    }

    updateObjects() {
        console.log("objectEls length is " + this.objectEls.length)
        let bHX = this.spaceState.blackHole.pos.x
        let bHY = this.spaceState.blackHole.pos.y
        for (let i = this.spaceState.objects.length - 1; i >= 0; i--) {
            let obj = this.objectEls[i]
            let distFromCentreX = Math.abs(bHX - this.spaceState.objects[i].pos.x)
            let distFromCentreY = Math.abs(bHY - this.spaceState.objects[i].pos.y)
            console.log(distFromCentreX)
            let x = this.spaceState.objects[i].pos.x
            let y = this.spaceState.objects[i].pos.y
            if (distFromCentreY < 20 && distFromCentreX < 20) {
                this.spaceState.objects.splice(i, 1)
                this.objectEls.splice(i, 1)
                obj.remove() 
            } else {
                obj.style.left = x + "px"
                obj.style.top = y + "px"
            }
        }
    }

    tick() {
        this.timeOut = setTimeout(() => {
            // console.log("Values to be updated " + JSON.stringify(this.spaceState.objects))
            this.spaceState = this.spaceState.update(this.spaceState.objects)
            // console.log(this.spaceState)
            this.updateObjects()
            this.schedule()
            this.turn++
        }, 1000)
    }
}