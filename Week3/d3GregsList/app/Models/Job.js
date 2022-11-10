import { generateId } from "../Utils/generateId.js"

export class Job {

	constructor(data) {
		this.id = generateId()
		this.createdAt = new Date()
		this.salary = data.salary
		this.title = data.title
		this.location = data.location
		this.startDate = data.startDate
		this.description = data.description
	}


	get CardTemplate() {
		return /*html*/`
		<div class="col-12 col-md-4 p-4">
			<div class="card">
				<div class="card-body">
					<div>Title:${this.title}</div>	
					<div>Salary: ${this.salary}</div>
					<div>Location: ${this.location}</div>
					<div class="d-flex justify-content-between">
						<button onclick="app.jobsController.setActive('${this.id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
							See Details
						</button>
						<button onclick="app.jobsController.remove('${this.id}')" title="Delete job!" class="btn btn-danger">
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
			<h1 class="modal-title fs-5" id="exampleModalLabel">
				${this.title}
			</h1>
			<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div class="modal-body">
			<div>${this.createdAt.toLocaleDateString()}</div>
			<div>Salary: $${this.salary}</div>
			<div>Location: ${this.location}</div>
			<div>Start Date: ${this.startDate}</div>
			<p>Desc: ${this.description}</p>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		</div>`

	}

	static getFormTemplate() {
		return /*html*/`
		<form class="d-flex gap-4 flex-wrap shadow rounded p-3 bg-white m-2 justify-items-center justify-content-start" onsubmit="app.jobsController.create()">
			<div class="form-floating w-25">
				<input required type="text" minlength="3" class="form-control" id="title" placeholder="Title"
				name="title">
				<label for="title">Title</label>
			</div>
			<div class="form-floating w-25">
				<input required type="number" class="form-control" id="salary" placeholder="Salary"
				name="salary">
				<label for="salary">Salary</label>
			</div>
			<div class="form-floating w-25">
				<input required type="text" minlength="3" class="form-control" id="location" placeholder="Location"
				name="location">
				<label for="location">Location</label>
			</div>
			<div class="form-floating w-25">
				<input required type="date"  class="form-control" id="startDate" placeholder="Start Date"
				name="startDate">
				<label for="startDate">Start Date</label>
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