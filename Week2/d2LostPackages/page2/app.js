console.log('App Loaded')
const packages = [{
	priorityLevel: 'express',
	isFragile: false,
	weight: 2,
	to: 'Sir Harrington IV',
	trackingNumber: '1324kjs'
},
{
	priorityLevel: 'standard',
	isFragile: true,
	weight: .5,
	to: 'Master Mercutio',
	trackingNumber: '1325sdk'
},
{
	priorityLevel: 'free',
	isFragile: true,
	weight: .5,
	to: 'Mistress Ravenfeather',
	trackingNumber: 'jffd147'
},
{
	priorityLevel: 'standard',
	isFragile: false,
	weight: 4,
	to: 'B. Robert Brown',
	trackingNumber: 'acdc145'
},
{
	priorityLevel: 'express',
	isFragile: true,
	weight: 6,
	to: 'Chancellor Wallace'
},
{
	priorityLevel: 'standard',
	isFragile: false,
	weight: 5,
	to: 'Sarah Sharm',
	trackingNumber: '8081baz'
},
{
	priorityLevel: 'free',
	isFragile: true,
	weight: 12,
	to: 'Tae Lien',
	trackingNumber: 'suz2367'
}]


function drawPackages(packages) {
	let packageElm = document.getElementById('packageArea')
	template = ''
	if (packages == undefined) { alert("Please input a package list to sort"); return null }
	packages.forEach(package => {
		template += `<div class="package">
				<div class="label">
					<div>
						<p>TO:</p>
						<p>${package.to}</p>
					</div>
					<div>
						<p>ID:</p>
						<p>${package.trackingNumber}</p>
					</div>
					<div>
						<p>Weight:</p>
						<p>${package.weight}</p>
					</div>
					<div>
						<p>Priority:</p>
						<p>${package.priorityLevel}</p>
					</div>
				</div>
			</div>`
	});
	packageElm.innerHTML = template;
}

function filterWeight() {
	let filteredPackages = packages.sort((packagea, packageb) => packageb.weight - packagea.weight)
	drawPackages(filteredPackages)
}
function filterPriority() {
	let filteredPackages = packages.sort((packagea, packageb) => packagea.priorityLevel.localeCompare(packageb.priorityLevel))
	drawPackages(filteredPackages)
}
function filterFragile() {
	let filteredPackages = packages.filter(package => package.isFragile)
	drawPackages(filteredPackages)
}

function filterNone() {
	drawPackages(packages)
}
drawPackages(packages)