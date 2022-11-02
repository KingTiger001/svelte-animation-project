import { writable } from 'svelte/store'

export const scrolledDown = writable<Boolean | undefined>(undefined)

export const scrolledUp = writable<Boolean | undefined>(undefined)
