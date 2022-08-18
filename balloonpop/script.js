let clickCount = 0
let width = 100
let height = 120
let maxSize = 300
let inflationRate = 20
let popCount = 0

let startButton = document.getElementById("start-game-button")
let inflateButton = document.getElementById("inflate-button")

function startGame() {
	startButton.setAttribute("disabled", "true")
	inflateButton.removeAttribute("disabled")
	setTimeout(() => {
		inflateButton.setAttribute("disabled", "true")
		startButton.removeAttribute("disabled")


	}, 3000)
}


function inflate() {
	let balloon = document.getElementById("balloon")
	let clickCountT = document.getElementById("click-count")

	height += inflationRate
	width += inflationRate

	if (height > maxSize) {
		height = 0
		width = 0
		document.getElementById("pop-count").innerText = popCount++
	}

	balloon.style.height = height + "px"
	balloon.style.width = width + "px"
	clickCount++
	clickCountT.innerText = clickCount
}
