const express = require('express');
const router = express.Router();
const FruitCart = require('../modules/FruitCart');
const myFruitCart = new FruitCart();

router.get('/', (req, res) => {
    res.send(myFruitCart.cart);
});

// router.post('/new/fruit', (req, res) => {
//     const newFruitObj = req.body;
//     const errMsg = fruits.length === 4 ? 'The fruit stand is currently full.' : null;

//     if (errMsg != null || newFruitObj == null || newFruitObj.name == null) {
//         res.status(500);
//         res.send({ error_message: errMsg });
//     }

//     fruits.push({
//         ...newFruitObj,
//         quantity: 20,
//     });
//     res.sendStatus(201);
// });

// router.put('/decrease/:idx', (req, res) => {
//     const fruitIndex = req.params.idx;
//     const count = req.body.quantity
//     const currentFruit = fruits[fruitIndex];

//     res.sendStatus(200);
// });

// router.put('/restock/:idx', (req, res) => {
//     const fruitIndex = req.params.idx;
//     const currentFruit = fruits[fruitIndex];

//     if (currentFruit == null) {
//         res.status(500);
//         res.send({ error_message: 'There is now fruit currently stocked in this position of the cart.' });
//     }

//     fruits[fruitIndex] = {
//         ...currentFruit,
//         quantity: 20,
//     };
//     res.sendStatus(200);
// });

// router.delete('/remove/:idx', (req, res) => {
//     res.send(fruits);
// });

module.exports = router;
