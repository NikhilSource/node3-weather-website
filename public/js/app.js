
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
}) 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    message1.textContent = ''
    message2.textContent = ''

    const location = search.value
    console.log(location)

    message1.textContent = 'Loading....'
    
    fetch('/weather?address=' + location ).then((response) => {
    response.json().then((data) => {
        if(data.error){
           return message1.textContent = data.error
        }

        message1.textContent = data.location
        message2.textContent = data.forecast
    })
})
})
