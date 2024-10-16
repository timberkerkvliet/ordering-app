export class OrderId {
    constructor(public readonly value: number) {
        const isPositiveInteger = Number.isInteger(value) && value >= 0;
        if (!isPositiveInteger) {
            throw new Error('Not an order id');
        }
    }

    public next() {
        return new OrderId(this.value + 1);
    }
}
