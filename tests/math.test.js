const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit} = require('../src/math.js')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)

    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12.5)
})

test('Should conver 32 F to 0 C', () => {
    const temperature = fahrenheitToCelsius(32)
    expect(temperature).toBe(0)
})

test('Should convert 0 C to 32 F', () => {
    const temperature = celsiusToFahrenheit(0)
    expect(temperature).toBe(32)
})
