//A A A

describe('Test in the App File', () => {
    test('should be 35', () => {

        // 1.Arrage
        const num1 = 10;
        const num2 = 20;

        // 2.Act
        const result = num1 + num2 + 5;

        // 3.Assert
        expect(result).toBe(35);
    })
});
