const vehiculoReducer = (state = '', action) => {
  switch (action.type) {
    case 'MOTO':
    {
      state = 'moto';
      return state;
    }
    case 'AUTO':
    {
      state = 'auto';
      return state;
    }
    default:
      return state;
  }
};

export default vehiculoReducer;
