const cpReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_CP':
    {
      state = action.payload;
      return state;
    }
    case 'REMOVE_CP':
    {
      state = '';
      return state;
    }
    default:
      return state;
  }
};

export default cpReducer;
