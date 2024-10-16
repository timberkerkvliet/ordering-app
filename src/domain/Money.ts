import bigDecimal from "js-big-decimal";

class Money {
    constructor(public readonly value: bigDecimal, public readonly currency: string) {
    }

    public static fromString(value: string, currency: string) {
        return new Money(new bigDecimal(value), currency);
    }

    add(money: Money) {
        if (this.currency !== money.currency) {
            throw new Error('Cannot add differenct currencies')
        }
        return new Money(this.value.add(money.value), this.currency);
    }

    divide(value: bigDecimal) {
        return new Money(this.value.divide(value), this.currency);
    }

    multiply(value: bigDecimal) {
        return new Money(this.value.multiply(value), this.currency);
    }

    round() {
        return new Money(this.value.round(2), this.currency);
    }

}

export { Money }