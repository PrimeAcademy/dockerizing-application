const fruits = (state = [], action) => {
    switch (action.type) {
      case 'SET_FRUITS':
        return action.payload;
      default:
        return state;
    }
};

export default fruits;