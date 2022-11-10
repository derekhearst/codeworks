import { appState } from "../AppState.js";
import { Job } from "../Models/Job.js";
import { saveState } from "../Utils/Store.js";


class JobsService {
	setActive(ID) {
		appState.activeJob = appState.jobs.find(c => c.id == ID)
	}
	create(formData) {
		let newJob = new Job(formData)
		appState.jobs = [...appState.jobs, newJob]
		saveState('jobs', appState.jobs)
	}
	remove(ID) {
		let filteredArray = appState.jobs.filter(c => c.id != ID)
		appState.jobs = filteredArray
		console.log('New array in AppState:', appState.jobs);
		saveState('jobs', appState.jobs)
	}

}
export const jobsService = new JobsService()