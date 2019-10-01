const movies = (state = [], action) => {
    switch (action.type) {
      case 'SET_MOVIES':
        return action.payload;
      case 'CLEAR_MOVIES':
        return [];
      default:
        return state;
    }
};

export default movies;