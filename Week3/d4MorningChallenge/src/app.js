function calcTime() {
	window.event.preventDefault();
	form = window.event.target
	let subDate = new Date(form.dateInput.value)
	let date = new Date()
	let days = (date.getTime() - subDate.getTime()) / 1000 / 60 / 60 / 24
	console.log(Math.floor(days))
	let output = document.getElementById("output")
	output.innerText = Math.floor(days)
	window.event.target.reset()
}