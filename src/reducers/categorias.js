const cpReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CATEGORIAS': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default cpReducer;
