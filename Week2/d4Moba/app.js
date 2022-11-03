const heroes = [
	{
		id: "aaaa",
		name: 'Slate Slabrock',
		type: 'dwarf',
		picture: './slate.png',
		damage: 5,
		health: 100
	},
	{
		id: "aaab",
		name: 'Flint Ironstag',
		type: 'elf',
		picture: 'flint.png',
		damage: 10,
		health: 50
	}
]

const items = [
	{
		id: 1,
		name: "Health Potion",
		cost: 20
	},

	{
		id: 2,
		name: "Damage potion",
		cost: 50,
	},

]
let gold = 50

const boss = {
	health: 100,
	maxHealth: 100,
	damage: 5,
	level: 1,
	name: "The rock!",
	attackSpeed: 3000
}


function drawHeros() {
	let hereosElm = document.getElementById("characters")
	let template = ''
	heroes.filter(h => h.health > 0).forEach(e => {
		template +=
			`
		<div class="character character-border" id="${e.id}">
			<div class="chead">
				<h3 class="text-white">${e.name}</h3>
				<img src="${e.picture}" alt="">
			</div>
			<div class="cbody">
				<div>HP:</div>
				<div class="health" >${e.health}</div>
			</div>
			<div class="cfooter">
				<div>Damage: </div>
				<div class="xp">${e.damage}</div>
			</div>
			<div class="hurtBox"></div>
		</div>
		`

	});
	hereosElm.innerHTML = template;
}
drawHeros();

function hurtHero(id, damage) {
	let heroElm = document.getElementById(id)
	let hero = heroes.find(e => e.id == id)
	hero.health -= damage
	drawHeros()
	heroElm = document.getElementById(id)
	heroElm.style.animationPlayState = "running"
}

let intervalID
function startBossDamage() {
	intervalID = setInterval(() => {
		let aliveHeros = heroes.filter(h => h.health > 0)
		let tempid = aliveHeros[Math.floor(Math.random() * aliveHeros.length)].id
		hurtHero(tempid, boss.damage)
		console.log("Damaged!")
	}, boss.attackSpeed)
}


function hurtBoss() {
	if (gameRunning == false) { return }
	let bossNameElm = document.getElementById("bossName")
	let bossBorderElm = document.getElementById("bossBorder")
	bossNameElm.style.animationPlayState = "paused"
	bossNameElm.style.animationPlayState = "running"
	bossBorderElm.style.animationPlayState = "paused"
	bossBorderElm.style.animationPlayState = "running"
	let totaldam = 0
	heroes.forEach(e => totaldam += e.damage)
	boss.health -= totaldam
	if (boss.health < 0) {
		boss.level++
		boss.maxHealth += 20
		boss.damage += 2
		boss.health = boss.maxHealth
		gold += 50
		boss.attackSpeed -= 300
		startOrStop()
	}
	updateBoss()
	updateGold()
}


function updateBoss() {
	let bossNameElm = document.getElementById("bossName")
	bossNameElm.innerText = `${boss.name} : level ${boss.level}`
	let bossBarElm = document.getElementById("bossBar")
	bossBarElm.style.width = (boss.health / boss.maxHealth) * 100 + '%'
	bossBarElm.innerText = boss.health
	if (boss.health <= 0) { bossBarElm.style.widows = 0 + "%" }
	console.log(bossBar);
}

updateBoss()

function updateGold() {
	document.getElementById("goldCount").innerText = gold
}

function buyItem(id) {
	switch (id) {
		case 1:
			if (gold >= 20) {
				heroes.forEach(h => h.health += 20)
				gold -= 20
			}
			break;
		case 2:
			if (gold >= 50) {
				heroes.forEach(h => h.damage += 5)
				gold -= 50
			}
			break;
	}
	updateGold()
	drawHeros()
}

let gameRunning = false;
function startOrStop() {
	let startButtonElm = document.getElementById("startStopButton")
	if (gameRunning) {
		clearInterval(intervalID)
		startButtonElm.innerText = "START!"
		gameRunning = false
	}
	else {
		startBossDamage()
		startButtonElm.innerText = "FIGHT!"
		gameRunning = true
	}

}