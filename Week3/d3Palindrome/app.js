let outElm = document.getElementById("output")

function calc() {
	window.event.preventDefault()
	let input = window.event.target.input.value

	let input2 = input.split("").reverse().join("");

	if (input == input2) {
		outElm.innerText = 'YES!'
	}
	else {
		outElm.innerText = 'NO!'

	}
}