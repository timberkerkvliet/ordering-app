class Quantity {
    constructor(public readonly value: number) {
        const isPositiveInteger = typeof value === 'number' && Number.isInteger(value) && value > 0;
        if (!isPositiveInteger) {
            throw new Error('Not a quantity');
        }
    }

    add(quantity: Quantity) {
        return new Quantity(this.value + quantity.value);
    }

}

export { Quantity }