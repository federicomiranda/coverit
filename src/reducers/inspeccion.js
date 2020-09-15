const inspeccion = (state = '', action) => {
  switch (action.type) {
    case 'SET_INSPECCION_DATA': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default inspeccion;
