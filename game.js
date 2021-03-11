// Create the Stage
let stageHeight = 0
let stageWidth = 0

function stageResize() {
	stageHeight = window.innerHeight
	stageWidth = window.innerWidth
}
stageResize()


// General variables
let lifes = 99
let time = 3
let createNewMosquito = 1500


// Dificult of the game (the interval the user has to click on the mosquito)
let difficult = window.location.search
difficult = difficult.replace('?', '')

if (difficult === 'normal') {
	createNewMosquito = 1500
} else if (difficult === 'hard') {
	createNewMosquito = 1000
} else if (difficult === 'chucknorris') {
	createNewMosquito = 750
}

let createMosquito = setInterval(() => { randomPosition() }, createNewMosquito)


// Timer to End the Game
let timer = setInterval(timeCounter, 1000)

function timeCounter() {

	time -= 1

	if (time < 0) {

		clearInterval(timer)
		clearInterval(createMosquito)
		window.location.href = 'win.html'
	} else {
		document.getElementById('timer-counter').innerHTML = time
	}

}

document.getElementById('timer-counter').innerHTML = time


// Creation of a New Position for the Mosquito and a New Mosquito 
function randomPosition() {

	let mosquitoImage = document.getElementById('mosquito')

	// Remove the previous mosquito (if exists) 
	if (mosquitoImage) {

		mosquitoImage.remove()

		// And remove 1 life point (if life if greater than 1)
		if (lifes <= 1) {
			document.getElementById(`v${lifes}`).src = "imagens/coracao_vazio.png"
			window.location.href = 'lose.html'
		} else {
			document.getElementById(`v${lifes}`).src = "imagens/coracao_vazio.png"

			lifes--
		}
	}

	// Random position
	let px = Math.floor(Math.random() * stageWidth) - 90
	let py = Math.floor(Math.random() * stageHeight) - 90

	px = px < 0 ? 0 : px
	py = py < 0 ? 0 : py

	// Create the html element (mosquito)
	let mosquito = document.createElement('img')
	mosquito.src = 'imagens/mosquito.png'
	mosquito.className = randomSize() + ' ' + randomFace()
	mosquito.style.left = `${px}px`
	mosquito.style.top = `${py}px`
	mosquito.style.position = 'absolute'
	mosquito.id = 'mosquito'

	// Removes mosquito if clicked
	mosquito.onclick = function () {
		this.remove()
	}

	// node.appendChild(mosquito)
	document.getElementById("stage").appendChild(mosquito)

}


function randomSize() {
	let mosquitoStyle = Math.floor(Math.random() * 3)

	switch (mosquitoStyle) {
		case 0:
			return 'mosquito1'

		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

function randomFace() {
	let mosquitoStyle = Math.floor(Math.random() * 2)

	switch (mosquitoStyle) {
		case 0:
			return 'A-side'

		case 1:
			return 'B-side'

	}
}

