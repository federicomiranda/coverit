const dataAuto = (state = '', action) => {
  switch (action.type) {
    case 'SET_DATA_VEHICULO': {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default dataAuto;
