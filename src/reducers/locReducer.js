const locReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_LOCALIDAD':
    {
      state = action.payload;
      return state;
    }
    case 'REMOVE_LOCALIDAD':
    {
      state = '';
      return state;
    }
    default:
      return state;
  }
};

export default locReducer;
