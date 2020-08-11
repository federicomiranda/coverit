const coberturaSeleccionada = (state = '', action) => {
  switch (action.type) {
    case 'SET_COBERTURA_SELECCIONADA': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default coberturaSeleccionada;
