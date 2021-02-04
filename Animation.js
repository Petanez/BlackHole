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
        if (this.turn < 5) 
            this.tick()
        else 
            console.log("Done")
    }
        
    createObjects() {
        for (let obj of this.spaceState.objects) {
            let objEl = document.createElement("div")
            objEl.style = `position: absolute; top: ${obj.pos.y}px; left: ${obj.pos.x}px; width: ${obj.d}px; height: ${obj.d}px; background: grey; border-radius: 99999px; transition: 1s linear;`
            this.objectEls.push(this.spaceEl.appendChild(objEl))
        }
    }

    updateObjects() {
        for (let i = 0; i < this.spaceState.objects.length; i++) {
            let x = this.spaceState.objects[i].pos.x
            let y = this.spaceState.objects[i].pos.y
            let obj = this.objectEls[i]
            obj.style.left = x + "px"
            obj.style.top = y + "px"
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