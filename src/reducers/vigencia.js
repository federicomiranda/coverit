const vigencia = (state = '', action) => {
  switch (action.type) {
    case 'SET_VIGENCIA': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default vigencia;
