export class Person {
	constructor(pic, name, color) {
		this.pic = pic
		this.name = name
		this.favoriteColor = color
		this.score = 0
	}


	get Template() {
		return `
	<div class="person">
		<div class="nameGroup">
			<img
				src="${this.pic}"
				alt="">
		  	<div class="name">${this.name}</div>
		</div>
		<div class="scoreGroup">
		  	<button onclick="app.personController.decreaseScore('${this.name}')"><div>-</div></button>
		  	<div class="score">${this.score}</div>
		  	<button onclick="app.personController.increaseScore('${this.name}')"><div>+</div></button>
		</div>
	</div>`

	}
}