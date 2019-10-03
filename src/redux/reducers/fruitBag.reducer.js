function addFruitToBag(newFruit, currBag) {
    let isMatchedItem = false
    const newBag = currBag.map(item => {
        let newBagItem = {
            ...item
        };

        if (item.name === newFruit.name
            && item.fruitIdx === newFruit.fruitIdx
        ) {
            isMatchedItem = true;
            newBagItem.count = newBagItem.count + 1;
        }

        return newBagItem;
    });

    if (!isMatchedItem) {
        newBag.push({
            ...newFruit,
            count: 1,
        });
    }

    return newBag;
}

const fruitBag = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_BAG':
            const newState = addFruitToBag(action.payload, state);
            return newState;
        case 'EMPTY_BAG':
            return [];
        default:
            return state;
    }
};

export default fruitBag;