const sumaAsegurada = (state = '', action) => {
  switch (action.type) {
    case 'SET_SUMA_ASEGURADA':
    {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default sumaAsegurada;
