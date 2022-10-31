let homeScoreElm = document.getElementById("homeScore")
let awayScoreElm = document.getElementById("awayScore")
let homeScore = 0;
let awayScore = 0;

function drawScore() {
	if (homeScore < 10) {
		homeScoreElm.innerText = "0" + homeScore
	} else {
		homeScoreElm.innerText = homeScore
	}
	if (awayScore < 10) {
		awayScoreElm.innerText = "0" + awayScore
	} else {
		awayScoreElm.innerText = awayScore
	}

}
function reset() {
	homeScore = 0;
	awayScore = 0;
	drawScore()
}

function addHome(amount) {
	homeScore += amount
	drawScore();
}
function addAway(amount) {
	awayScore += amount
	drawScore()
}