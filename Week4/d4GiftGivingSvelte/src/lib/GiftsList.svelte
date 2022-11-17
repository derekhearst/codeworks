<script>
	export async function getGifts() {
		let res = await axios.get("https://bcw-sandbox.herokuapp.com/api/gifts")
		gifts = res.data
	}
	getGifts()
	let gifts = []
	async function openGift(id) {
		console.log("opening gift", id)
		let res = await axios.put("https://bcw-sandbox.herokuapp.com/api/gifts/" + id, { opened: true })
		getGifts()
	}
</script>

<body>
	{#each gifts as gift}
		{#if gift.opened}
			<div class="gift">
				<h1>{gift.tag}</h1>
				<img src={gift.url} alt={gift.tag} />
			</div>
			<!-- content here -->
		{:else}
			<div class="gift unopened">
				<img class="cursor-pointer" src="https://dkstatic.s3.amazonaws.com/Creative-Development/2019/DFS/cp-eightDaysOfGifts/Gift-01.png" alt="un-opened gift" on:click={() => openGift(gift.id)} />
			</div>
		{/if}
	{/each}
</body>

<style>
	body {
		@apply flex flex-wrap gap-3 h-min;
	}
	.gift {
		@apply w-32 border border-black;
	}
	.gift.unopened img {
		transform-origin: bottom;
	}

	.gift.unopened img:hover {
		animation: opening 2s linear infinite alternate;
		animation-fill-mode: forwards;
	}

	@keyframes opening {
		from {
			rotate: 0deg;
		}
		25% {
			rotate: -10deg;
		}
		50% {
			rotate: 10deg;
		}
		100% {
			rotate: -10deg;
		}
	}
</style>
