
document.addEventListener('DOMContentLoaded', () => initialize())

let monsterPage = 1


function initialize() {
    const form = document.createElement('form')
    form.id = 'monster-form'
    form.innerHTML = `
    <input id = "name" placeholder = "name..." type = "text">
    <input id = "age" placeholder = "age..." type = "number">
    <input id = "description" placeholder = "description...">
    <input type = "submit">

    `
    document.getElementById('create-monster').append(form)

    loadMonsters(monsterPage)

    document.getElementById('forward').addEventListener('click', () => nextpage())
    document.getElementById('back').addEventListener('click', () => prevpage())

    const monsterForm = document.getElementById('monster-form')
    monsterForm.addEventListener('submit', (e) => addMonster(e))
}

function addMonster(e) {
    const monsterForm = document.getElementById('monster-form')
    e.preventDefault()
    const monsterObj = {}
    monsterObj.name = monsterForm.name.value
    monsterObj.age = monsterForm.age.value
    monsterObj.description = monsterForm.description.value

    monsterForm.name.value = ''
    monsterForm.age.value = ''
    monsterForm.description.value = ''
    
    
    fetch('http://localhost:3000/monsters', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(monsterObj)
    })

}

function prevpage() {
    if (monsterPage <= 1) {
        alert('Fresh outta monsters!')
    } else {
        monsterPage--
        loadMonsters(monsterPage)
    }
}

function nextpage() {
    monsterPage++
    loadMonsters(monsterPage)
}


function loadMonsters(page) {

    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
    .then(res => res.json())
    .then(data => renderMonsters(data))

}

function renderMonsters(data) {
    document.getElementById('monster-container').innerHTML = ''
    for(const monster of data) {
        const d = document.createElement('div')
        const h = document.createElement('h2')
        h.innerText = monster.name
        d.append(h)

        const h4 = document.createElement('h4')
        h4.innerText = `Age: ${monster.age}`
        d.append(h4)

        const p = document.createElement('p')
        p.innerText = monster.description
        d.append(p)

        document.getElementById('monster-container').append(d)
    }
}