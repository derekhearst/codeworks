const clickUpgrades = [
	{
		name: 'pickaxe',
		price: 100,
		quantity: 0,
		multiplier: 1,
		click: true,
	},
	{
		name: 'drill',
		price: 250,
		quantity: 0,
		multiplier: 5,
		click: true,
	}
	,
	{
		name: 'super-drill',
		price: 500,
		quantity: 0,
		multiplier: 10,
		click: true,
	}
];

const automaticUpgrades = [
	{
		name: 'Mousetronoaut',
		price: 1000,
		quantity: 0,
		income: 10,
		click: false,
	},
	{
		name: 'Space station',
		price: 5000,
		quantity: 0,
		income: 100,
		click: false,
	}
	,
	{
		name: 'Death Star',
		price: 10000,
		quantity: 0,
		income: 1000,
		click: false,
	}
];

let allUpgrades = automaticUpgrades.concat(clickUpgrades)

let money = 0

let highScore = 0


function load() {
	if (localStorage.getItem("itemsOwned") == null) {
		localStorage.setItem("itemsOwned", JSON.stringify(allUpgrades))
	} else {
		allUpgrades = JSON.parse(localStorage.getItem("itemsOwned"))
	}

	if (localStorage.getItem("money") == null) {
		localStorage.setItem("money", JSON.stringify(money))
	} else {
		money = JSON.parse(localStorage.getItem("money"))
	}



	drawMoney()
	drawPower()
	drawStats()
	drawUpgrades()
}

function save() {
	localStorage.setItem("itemsOwned", JSON.stringify(allUpgrades))
	localStorage.setItem("money", JSON.stringify(money))

}
// Load High Score always
if (localStorage.getItem("highScore") == null) {
	localStorage.setItem("highScore", JSON.stringify(highScore))
} else {
	highScore = JSON.parse(localStorage.getItem("highScore"))
}


function drawHighScore() {
	document.getElementById("highScore").innerText = highScore
}

drawHighScore()

let intervalID = setInterval(doInterval, 3000)



function drawUpgrades() {
	let clickUpgradeSection = document.getElementById("clickUpgradeSection")
	let autoUpgradeSection = document.getElementById("autoUpgradeSection")
	clickTemplate = ''
	allUpgrades.forEach((u) => {
		if (u.click) {


			let displayPrice = u.price / 1000 <= 1 ? `${u.price}` : `${u.price / 1000}k`
			if (u.price <= money) {
				clickTemplate +=
					`
				<div class="upgrade">
				<button onclick="buyItem('${u.name}')">${displayPrice} <i class="mdi mdi-cheese"></i></button>
				<div class="upgradeText">${u.name} +${u.multiplier}</div>
				</div>
				`
			}
		}
	})
	if (clickTemplate == '') {
		clickTemplate = `There are no upgrades available`
	}
	clickUpgradeSection.innerHTML = clickTemplate


	autoTemplate = ''
	allUpgrades.forEach((u) => {
		let displayPrice = u.price / 1000 < 1 ? `${u.price}` : `${u.price / 1000}k`
		if (u.price <= money) {
			if (!u.click) {
				autoTemplate +=
					`
				<div class="upgrade">
				<button onclick="buyItem('${u.name}')">${displayPrice} <i class="mdi mdi-cheese"></i></button>
				<div class="upgradeText">${u.name} +${u.income}</div>
				</div>
				`
			}
		}
	})
	if (autoTemplate == '') {
		autoTemplate = `There are no upgrades available`
	}
	autoUpgradeSection.innerHTML = autoTemplate

}

drawUpgrades()

function drawStats() {
	let clickStatsSectionElm = document.getElementById("clickStatsSection")
	let autoStatsSectionElm = document.getElementById("autoStatsSection")

	let clickTemplate = '', autoTemplate = ''

	allUpgrades.forEach(u => {
		if (u.click) {
			clickTemplate +=
				`
			<div class="stat">
				<div class="statCount">
					<div class="statBox">${u.quantity}</div>
					<div class="statTitle">${u.name}</div>
				</div>
				<i class="mdi mdi-arrow-right"></i>
				<div class="statBox">${u.quantity * u.multiplier}</div>
			</div>			
			`
		}
	})



	clickStatsSectionElm.innerHTML = clickTemplate

	allUpgrades.forEach(u => {
		if (!u.click) {
			autoTemplate +=
				`
			<div class="stat">
				<div class="statCount">
					<div class="statBox">${u.quantity}</div>
					<div class="statTitle">${u.name}</div>
				</div>
				<i class="mdi mdi-timer"></i>
				<div class="statBox">${u.quantity * u.income}</div>
			</div>			
			`
		}
	})


	autoStatsSectionElm.innerHTML = autoTemplate
}

drawStats()


function drawMoney() {
	let moneyElm = document.getElementById("moneyDisplay")
	moneyElm.innerText = money
	if (money > highScore) {
		highScore = money
		localStorage.setItem("highScore", JSON.stringify(highScore))

	}
	drawHighScore()
	drawUpgrades()
}

drawMoney()

function drawPower() {
	let minePower = document.getElementById("clickPower")
	let autoPower = document.getElementById("autoPower")

	let mpower = 1
	let apower = 0
	allUpgrades.forEach(u => {
		if (u.click) {
			mpower += u.quantity * u.multiplier

		} else {
			apower += u.quantity * u.income
		}
	})


	minePower.innerText = mpower
	autoPower.innerText = apower
}

drawPower()

function mine() {
	sumToAdd = 0
	allUpgrades.forEach(u => {
		if (u.click) {
			sumToAdd += u.quantity * u.multiplier
		}
	})
	money += sumToAdd + 1
	drawMoney()
}

function doInterval() {

	console.log("Did Interval")
	let sumToAdd = 0
	allUpgrades.forEach(u => {
		if (!u.click) {
			sumToAdd += u.quantity * u.income
		}
	});

	money += sumToAdd
	drawMoney()

}

function buyItem(name) {


	item = allUpgrades.find(e => e.name == name)

	if (money >= item.price) {
		money -= item.price
		item.quantity++
		item.price += 10
		console.log("Bought item", item.name, item.price)
		console.log("Money Left", money)
	} else {

		console.log("Can't buy item", item.name)
	}


	drawStats()
	drawMoney()
	drawPower()

}


