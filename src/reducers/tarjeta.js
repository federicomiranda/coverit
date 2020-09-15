const tarjeta = (state = '', action) => {
  switch (action.type) {
    case 'SET_DATA_TARJETA': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default tarjeta;
