const vehiculoAsegurar = (state = '', action) => {
  switch (action.type) {
    case 'SET_VEHICULO_ASEGURAR':
    {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default vehiculoAsegurar;
