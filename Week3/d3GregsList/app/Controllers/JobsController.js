import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _draw() {
	let template = ''
	appState.jobs.forEach(job => template += job.CardTemplate)
	setHTML('listings', template)
	setHTML('listing-form', Job.getFormTemplate())
}

function _drawActive() {
	setHTML('details', appState.activeJob.ActiveTemplate)
}


export class JobsController {

	constructor() {
		appState.on('jobs', _draw)
		appState.on('activeJob', _drawActive)
	}

	create() {
		window.event.preventDefault()
		let form = window.event.target
		let formData = getFormData(form)
		console.log(formData);
		jobsService.create(formData)
	}

	async remove(ID) {
		if (await Pop.confirm('Are you sure want to delete that job')) {
			jobsService.remove(ID)
		}
	}

	setActive(ID) {
		jobsService.setActive(ID)
	}
	draw() {
		_draw()
	}
}