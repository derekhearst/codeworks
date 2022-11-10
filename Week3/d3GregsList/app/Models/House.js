import { generateId } from "../Utils/generateId.js"

export class House {

	constructor(data) {
		this.id = generateId()
		this.createdAt = new Date()
		this.year = data.year
		this.price = data.price
		this.squareFeet = data.squareFeet
		this.rooms = data.rooms
		this.bathrooms = data.bathrooms
		this.color = data.color
		this.img = data.img
		this.description = data.description
	}


	get CardTemplate() {
		return /*html*/`
		<div class="col-12 col-md-4 p-4">
			<div class="card">
				<img src="${this.img}" class="card-img-top" alt="house">
				<div class="card-body">
					<div class="d-flex justify-content-between"> 
						<div>
							<p>Year: ${this.year}</p>
							<p>SqFt: ${this.squareFeet}</p>
						</div>
						<h4>$${this.price}</h4>	
					</div>
					<div class="d-flex justify-content-between">
						<button onclick="app.housesController.setActive('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
						See Details
						</button>
						<button onclick="app.housesController.remove('${this.id}')" title="Delete house!" class="btn btn-danger">
						<i class="mdi mdi-delete"></i>
						</button>
					</div>
				</div>
			</div>
		</div>
		`
	}

	get ActiveTemplate() {
		return /*html*/`
		<div class="modal-header">
			<h1 class="modal-title fs-5" id="exampleModalLabel">Year: ${this.year} | SqFt :  ${this.squareFeet}</h1>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div class="modal-body">
			<h5>
				${this.createdAt.toLocaleDateString()}
			</h5>
			<img src="${this.img}" alt="car" class="img-fluid">
			<b>Price: $${this.price}</b>
			<div>Rooms: ${this.rooms} | Bathrooms: ${this.bathrooms}</div>
			<div>Color: ${this.color}</div>
			<p>Desc: ${this.description}</p>
		</div>
		<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		</div>`

	}

	static getFormTemplate() {
		return /*html*/`
		<form class="d-flex gap-4 flex-wrap shadow rounded p-3 bg-white m-2 justify-items-center justify-content-start" onsubmit="app.housesController.create()">
			<div class="form-floating w-25">
				<input required type="number"  class="form-control" id="year" placeholder="Year"
				name="year">
				<label for="Year">Year</label>
			</div>
			<div class="form-floating w-25">
				<input required type="number"  class="form-control" id="price" placeholder="Price"
				name="price">
				<label for="Price">Price</label>
			</div>
			<div class="form-floating w-25">
				<input required type="number" class="form-control" id="squareFeet" placeholder="SquareFeet"
				name="squareFeet">
				<label for="squareFeet">SquareFeet</label>
			</div>
			<div class="form-floating w-25">
				<input required type="number" class="form-control" id="rooms" placeholder="Rooms"
				name="rooms">
				<label for="rooms">Rooms</label>
			</div>
			<div class="form-floating w-25">
				<input required type="number" class="form-control" id="bathrooms" placeholder="Bathrooms"
				name="bathrooms">
				<label for="bathrooms">Bathrooms</label>
			</div>
			<div class="form-floating w-25">
				<input required type="text" class="form-control" id="color" placeholder="Color"
				name="color">
				<label for="color">Color</label>
			</div>
			<div class="form-floating w-25">
				<input required type="url" minlength="3" class="form-control" id="img" placeholder="Image"
				name="img">
				<label for="img">Image</label>
			</div>
			<div class="form-floating w-25">
				<input required type="text" minlength="3" class="form-control" id="description" placeholder="Description"
				name="description">
				<label for="description">Description</label>
			</div>
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="reset" class="btn btn-outline-danger">Reset</button>
		</form>
		`
	}

}