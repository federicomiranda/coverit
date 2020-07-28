const clientData = (state = '', action) => {
  switch (action.type) {
    case 'SET_CLIENT_DATA':
    {
      state = action.payload;
      return state;
    }
    default:
      return state;
  }
};

export default clientData;
