const reverse = require('../utils/for-testing').reverse

test('reverse of a', () => {
    const result = reverse('a')

    expect(result).toBe('a')
})

test('palindrome of react', () => {
    const result = reverse('react')

    expect(result).toBe('tkaer')
})

test('reverse of releveler', () => {
    const result = reverse('releveler')

    expect(result).toBe('releveler')
})