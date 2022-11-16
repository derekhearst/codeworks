<script>
	import { Pop } from "../Utils/Pop.js"

	async function getJobs() {
		const res = await axios.get("https://bcw-sandbox.herokuapp.com/api/jobs")
		jobs = res.data.map(c => new Job(c))
	}
	getJobs()

	let jobs = []
	class Job {
		constructor(data) {
			this.data = data
		}
	}
	let activeJob = new Job({})

	async function submitForm(event) {
		const formData = new FormData(event.target)
		let data = {}
		for (let field of formData) {
			const [key, value] = field
			data[key] = value
		}
		console.log(data)
		if (data.id != "undefined") {
			console.log("Editing", data.id)
			const res = await axios.put("https://bcw-sandbox.herokuapp.com/api/jobs/" + data.id, data)
			console.log("[PUT]", res)
			activeJob = new Job({})
			Pop.toast("Edited a listing!")
		} else {
			console.log("CREATING", data)
			const res = await axios.post("https://bcw-sandbox.herokuapp.com/api/jobs", data)
			console.log("[POST]", res)
			Pop.toast("Created a listing!")
		}
		event.target.reset()
		getJobs()
	}

	async function removeID(id) {
		let job = jobs.find(c => c.data.id == id)
		if (job) {
			const res = await axios.delete(`https://bcw-sandbox.herokuapp.com/api/jobs/${job.data.id}`)
			jobs = jobs.filter(c => c.data.id != id)
			Pop.toast("Removed that job!")
		}
	}
	function viewID(id) {}
	function editID(id) {
		activeJob = jobs.find(c => c.data.id == id)
		Pop.toast("Now Editing")
	}
</script>

<h1 class="bg-gray-800 text-white text-center p-3">JOBS</h1>

<main>
	<form class="flex my-5 p-3 m-6 rounded gap-3 flex-wrap bg-gray-800" on:submit|preventDefault={submitForm}>
		<input id="id" name="id" type="hidden" value={activeJob.data.id} />
		<div class="flex gap-3 flex-wrap">
			<div class="field">
				<label>Company :</label>
				<input id="company" name="company" type="text" required value={activeJob.data.company || ""} />
			</div>
			<div class="field">
				<label>Job Title :</label>
				<input id="jobTitle" name="jobTitle" type="text" required value={activeJob.data.jobTitle || ""} />
			</div>
			<div class="field">
				<label>Hours :</label>
				<input id="hours" name="hours" type="number" required value={activeJob.data.hours || ""} />
			</div>
			<div class="field">
				<label>Rate :</label>
				<input id="rate" name="rate" type="number" required value={activeJob.data.rate || ""} />
			</div>
			<div class="field">
				<label>Description :</label>
				<input id="description" name="description" type="text" required value={activeJob.data.description || ""} />
			</div>
		</div>

		<div class="mx-auto gap-3 flex">
			<button class="mx-auto p-3 bg-blue-800">Submit New job</button>
		</div>
	</form>
</main>
<main>
	{#each jobs as job (job.data.id)}
		<div class="flex-shrink basis-72 flex flex-col rounded bg-gray-700">
			<img class="rounded-t" src={job.data.imgUrl} />
			<div class="p-3 flex flex-col flex-grow">
				<h1>{job.data.jobTitle} @ {job.data.company}</h1>

				<h2>{job.data.hours}h @ ${job.data.rate}/h</h2>
				<div class="flex justify-between mt-auto">
					<button class="border-b text-red-400" on:click={() => removeID(job.data.id)}>Delete!</button>
					<button class="border border-gray-600" on:click={() => editID(job.data.id)}>Edit!</button>
					<button class="bg-blue-800 text-xl" on:click={() => viewID(job.data.id)}>Info!</button>
				</div>
			</div>
		</div>
	{/each}
</main>

<style>
	input {
		@apply bg-gray-600 text-white;
	}
	main {
		@apply flex gap-4 flex-wrap justify-center text-white;
	}
	h1 {
		@apply text-xl text-ellipsis;
	}
	button {
		@apply px-3;
	}

	.field {
		@apply flex-auto basis-4/12 flex justify-evenly border p-2 rounded border-gray-700;
	}
</style>
