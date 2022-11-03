const iceCream = [{
	name: 'Cookie Dough',
	image: 'https://celebratingsweets.com/wp-content/uploads/2014/04/Cookie-Dough-Ice-Cream-1-5.jpg',
	price: 1,
	quantity: 0
}, {
	name: 'Vanilla',
	image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/ultimate-vanilla-ice-cream-1628511695.jpg',
	price: 1,
	quantity: 0
}, {
	name: 'Strawberry',
	image: 'https://www.realfoodwithjessica.com/wp-content/uploads/2017/07/paleostrawberryicecream2.jpg',
	price: 2,
	quantity: 0
}]

const vessels = [{
	name: 'Waffle Cone',
	image: 'https://m.media-amazon.com/images/I/71VNjBMakfL._SL1500_.jpg',
	price: 2,
	quantity: 0
}, {
	name: 'Waffle Bowl',
	image: 'http://images.wbmason.com/350/L_JOY66050.jpg',
	price: 4,
	quantity: 0
}]

const toppings = [{
	name: 'Sprinkles',
	image: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Sprinkles2.jpg',
	price: 1,
	quantity: 0
}, {
	name: 'Choclate Chips',
	image: 'https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/chocolate-chips.jpg?quality=82&strip=1&resize=640%2C360',
	price: 2,
	quantity: 0
}]

let allItems = vessels.concat(toppings).concat(iceCream)

let vesselCount = 0
function addItem(name) {
	let item = allItems.find(i => i.name == name)
	if (item.name.includes("Bowl") || item.name.includes("Cone")) {
		if (vesselCount > 0) {
			window.alert("YOU CAN'T ADD MORE THAN ONE VESSEL!!!")
		} else {
			vesselCount++
			item.quantity++
		}
	} else {
		item.quantity++
	}

	drawCart()
}

function removeItem(name) {
	let item = allItems.find(i => i.name == name)
	if (item.quantity != 0) {
		if (item.name.includes("Bowl") || item.name.includes("Cone")) {
			vesselCount--
		}
		item.quantity--
		drawCart()
	}
}

function pay() {
	allItems.forEach(e => e.quantity = 0)
	drawCart()
}

function drawCart() {
	cartElm = document.getElementById("cartItems");
	let template = ''

	allItems.forEach((s) => {
		if (s.quantity > 0) {
			template +=
				`<div class="col-12 cartItem" onclick="removeItem('${s.name}')" style="background-image: url('${s.image}')">
				<div class="row">
					<div class="col-5 flex-grow-1">${s.name}</div>
					<div class="col">${s.quantity}</div>
					<div class="col">$${s.price}</div>
					<div class="col">$${s.price * s.quantity}</div>
				</div>
			</div>`
		}
	});
	cartElm.innerHTML = template;

	let sum = 0
	allItems.filter(e => e.quantity > 0).map(e => sum += e.price * e.quantity)

	document.getElementById("totalnum").innerText = sum
}

function populateItems() {

	toppingsElm = document.getElementById("toppings")
	template = ''
	toppings.forEach(topping => {
		template +=
			`<div class="col m-1 bg-white rounded shadow p-2 addItem" onclick="addItem('${topping.name}')">
			<img class="img-fluid rounded"
				src="${topping.image}" alt="">
			<div class="text-center">
				<p class="m-0">${topping.name} : $${topping.price}</p>
			</div>
		</div>`
	})
	toppingsElm.innerHTML = template;

	vesselElm = document.getElementById("vessels")
	template = ''
	vessels.forEach(vessel => {
		template +=
			`<div class="col m-1 bg-white rounded shadow p-2 addItem" onclick="addItem('${vessel.name}')">
			<img class="img-fluid rounded"
				src="${vessel.image}" alt="">
			<div class="text-center">
				<p class="m-0">${vessel.name} : $${vessel.price}</p>
			</div>
		</div>`
	})
	vesselElm.innerHTML = template;

	iceCreamElm = document.getElementById("icecream")
	template = ''
	iceCream.forEach(iceCreamScoop => {
		template +=
			`<div class="col m-1 bg-white rounded shadow p-2 addItem" onclick="addItem('${iceCreamScoop.name}')">
			<img class="img-fluid rounded"
				src="${iceCreamScoop.image}" alt="">
			<div class="text-center">
				<p class="m-0">${iceCreamScoop.name} : $${iceCreamScoop.price}</p>
			</div>
		</div>`
	})
	iceCreamElm.innerHTML = template;
}
populateItems()