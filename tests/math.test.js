const { calculateTip, fahrenheitToCelcius, celciusToFahrenheit } = require('../src/math')

test('Should calculate total with tip', () => {
	const total = calculateTip(10, .3)
	expect(total).toBe(13)

	// if (total !== 13){
	// 	throw new Error('Total tip should be 13. Got ' + total)
	// }
})

test('Should calculate total with default tip', () => {
	const total = calculateTip(10)
	expect(total).toBe(12.5)
})

test('Should convert Fahrenheit to Celcius', () => {
	const temp = fahrenheitToCelcius(32)
	expect(temp).toBe(0)
})

test('Should convert Celcius to Fahrenheit', () => {
	const temp = celciusToFahrenheit(0)
	expect(temp).toBe(32)
})