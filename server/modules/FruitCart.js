const randomNumber = require('./randomNumberGen');

class FruitCart {
    constructor() {
        this._fruits = [];
        this._fruitOpts = [
            'Apple',
            'Pear',
            'Banana',
            'Kiwi',
            'Orange',
            'Watermelon',
            'Cantaloupe',
            'Pineapple',
        ];
        this._maxCapacity = 20;
        this._cartSlots = 4;

        this._init();
    }

    //
    // PRIVATE METHODS
    // --------------------------------------------------------------------------------

    _init() {
        this._setupCart();
    }

    /**
     * Clears out all of the current fruit on the cart and sets up a brand new randomized cart.
     */
    _setupCart() {
        const newFruits = [];

        for (let i = 0; i < this._cartSlots; i++) {
            const randoFruitIdx = randomNumber(0, this._fruitOpts.length - 1);
            const fruitSlot = {
                name: this._fruitOpts[randoFruitIdx],
                quantity: this._maxCapacity,
            };

            newFruits.push(fruitSlot);
        }

        this._fruits = newFruits;
    }

    _decreaseFruitFromSlot() {}

    //
    // PUBLIC METHODS
    // --------------------------------------------------------------------------------

    get cart() {
        return this._fruits;
    }
}

module.exports = FruitCart;