import { writable } from 'svelte/store'

export let cars = writable([])
export let activeCar = writable({})
