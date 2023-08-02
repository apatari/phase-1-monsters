
document.addEventListener('DOMContentLoaded', () => initialize())

function initialize() {
    const form = document.createElement('form')
    form.id = 'moster-form'
    form.innerHTML = `
    <input id = "name" placeholder = "name..." type = "text">
    <input id = "age" placeholder = "age..." type = "number">
    <input id = "description" placeholder = "description...">
    <input type = "submit">

    `
    document.getElementById('create-monster').append(form)
}