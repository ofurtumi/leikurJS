let a
let p
let pId = document.querySelector("#pId")
let pHolder = document.querySelector("#pHolder")
let pTemplate = document.querySelector("#pTemplate")

async function getData() {
    let attacks = await fetch("attacks.json")
    a = await attacks.json()
    
    let players = await fetch("players.json")
    p = await players.json()

    console.log(
        players,
        attacks
    )
    // console.log(attacks[getPAttack("p001",1)])
    console.log(getPAttack("p001",1).name)
}

function getPAttack(playerID,attackIndex) {
    let attack = a[p[playerID].attacks[attackIndex]]
    console.log(attack)
    return attack
}

function showPlayer(id) {
    let cP = p[id]
    while (pHolder.firstChild) {
        pHolder.removeChild(pHolder.firstChild)
    }

    let temp = pTemplate.content.cloneNode(true)
    // console.log(temp.childNodes)
    temp.querySelector("#pName").textContent = cP.name
    temp.querySelector("#pHp").textContent = cP["current-hp"]+"/"+cP["max-hp"]
    temp.querySelector("#pAc").textContent = cP.ac
    temp.querySelector("#pMana").textContent = cP.mana
    temp.querySelector("#pLevel").textContent = cP.level
    temp.querySelector("#pClass").textContent = cP.class
    pHolder.appendChild(temp)
    pHolder.classList.remove("helptext")
}

function listPlayers() {
    while (pHolder.firstChild) {
        pHolder.removeChild(pHolder.firstChild)
    }
    pHolder.classList.add("helptext")
    let num = Object.keys(p).length
    let paragraph = document.createElement("p")
    paragraph.textContent = "number of players: " + num
    pHolder.appendChild(paragraph)
    let ol = document.createElement("ol")
    for (const i in p) {
        let li = document.createElement("li")
        li.textContent = "id:" + i + ", name: " + p[i].name
        ol.appendChild(li)
    }
    pHolder.appendChild(ol)
}

async function onStart() {
    document.title = "game"
    await getData()

    pId.value = ""
    pId.addEventListener("input",(e)=> {
        if(p[pId.value]) showPlayer(pId.value)
        else listPlayers()
    })
    await listPlayers()
}

onStart()
