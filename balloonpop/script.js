let startButton = document.getElementById("start-game-button")
let inflateButton = document.getElementById("inflate-button")

//#region Game Logic
let clickCount = 0
let width = 100
let height = 120
let maxSize = 300
let inflationRate = 20
let currPopCount = 0
let gameLength = 5000
let clockID = 0
let timeRemaining = 0
let currPlayer

function startGame() {
	document.getElementById("controls").classList.add("hidden")
	document.getElementById("gameview").classList.remove("hidden")

	startClock()
	setTimeout(stopGame, gameLength)
}

function startClock() {
	timeRemaining = gameLength / 1000
	drawClock()
	clockID = setInterval(drawClock, 1000)
}

function stopClock() {
	clearInterval(clockID)
}

function drawClock() {
	let countDownE = document.getElementById("time-remaining")
	countDownE.innerText = timeRemaining--
}

function inflate() {
	height += inflationRate
	width += inflationRate
	if (height > maxSize) {
		height = 20
		width = 0
		currPopCount++
	}
	clickCount++
	draw()
}

function draw() {
	let balloonE = document.getElementById("balloon")
	let clickCountE = document.getElementById("click-count")
	let popCountE = document.getElementById("pop-count")
	let highScoreE = document.getElementById("high-score-count")
	let playerNameE = document.getElementById("playername")

	playerNameE.innerText = currPlayer.name
	balloonE.style.height = height + "px"
	balloonE.style.width = width + "px"
	clickCountE.innerText = clickCount
	popCountE.innerText = currPopCount
	highScoreE.innerText = currPlayer.topScore
}

function stopGame() {
	console.log("Game Over!")
	document.getElementById("controls").classList.remove("hidden")
	document.getElementById("gameview").classList.add("hidden")

	clickCount = 0
	height = 120
	width = 100

	if (currPlayer.topScore < currPopCount) {
		currPlayer.topScore = currPopCount
	}
	clickCount = 0
	currPopCount = 0
	savePlayers()
	stopClock()
	draw()
}

//#endregion Game Logic

//#region User Handling

let players = []
loadPlayers()
function setPlayer(event) {
	event.preventDefault()
	let form = event.target
	let playername = form.playername.value

	currPlayer = players.find(player => player.name == playername)
	if (!currPlayer) {
		currPlayer = { name: playername, topScore: 0 }
		players.push(currPlayer)
		savePlayers()
	}
	form.reset()

	document.getElementById("game").classList.remove("hidden")
	document.getElementById("playerform").classList.add("hidden")
	draw()
}

function changePlayer() {
	document.getElementById("game").classList.add("hidden")
	document.getElementById("playerform").classList.remove("hidden")
}

function savePlayers() {
	localStorage.setItem("players", JSON.stringify(players))
}

function loadPlayers() {
	players = JSON.parse(localStorage.getItem("players"))
	if (!players) { players = [] }
}
//#endregion
