const locReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SOLICITUD': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default locReducer;
