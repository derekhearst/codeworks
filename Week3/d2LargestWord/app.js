function doSubmit() {
	window.event.preventDefault()
	let words = window.event.target.textarea.value.split(" ")
	maxLength = 0
	words.forEach(element => {
		if (element.length > maxLength) { maxLength = element.length }
	});
	window.alert(maxLength)
}