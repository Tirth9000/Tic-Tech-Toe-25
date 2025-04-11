import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function randomFluorescentColorGeneratorFnc() {
	// Generate a random color component with high saturation
	// Fluorescent colors usually have a high saturation and brightness
	const r = Math.floor(Math.random() * 128) + 127; // Red component (bright range)
	const g = Math.floor(Math.random() * 128) + 127; // Green component (bright range)
	const b = Math.floor(Math.random() * 128) + 127; // Blue component (bright range)

	console.log(`#${r.toString(16)}${g.toString(16)}${b.toString(16)}`)
	// Return the RGB color in string format
	// return `rgb(${r}, ${g}, ${b})`;
	// no 7char hex format
	return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}