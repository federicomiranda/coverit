const clientData = (state = '', action) => {
  switch (action.type) {
    case 'SET_CLIENT_DATA': {
      state = action.payload;
      return state;
    }
    case 'SET_EDIT_DATA': {
      state = {
        ...state,
        nombre: action.payload.nombre,
        apellido: action.payload.apellido,
        email: action.payload.email,
      };
      return state;
    }
    case 'ADD_CLIENT_DATA': {
      state = {
        ...state,
        dniElegido: action.payload.dniElegido,
        dniValue: action.payload.dniValue,
        nacimiento: action.payload.nacimiento,
        pais: action.payload.pais,
        sexo: action.payload.sexo,
      };
      return state;
    }
    case 'ADD_TRIBUTE_DATA': {
      state = {
        ...state,
        CUILT: action.payload.CUILT,
        condicionIVA: action.payload.condicionIVA,
        condicionIIBB: action.payload.condicionIIBB,
        IIBB: action.payload.IIBB,
      };
      return state;
    }
    case 'ADD_PERSONAL_DATA': {
      state = {
        ...state,
        CUILT: action.payload.CUILT,
        condicionIVA: action.payload.condicionIVA,
        condicionIIBB: action.payload.condicionIIBB,
      };
      return state;
    }
    case 'ADD_CLIENT_DIRECTION': {
      state = {
        ...state,
        calle: action.payload.calle,
        nro: action.payload.nro,
        piso: action.payload.piso,
        depto: action.payload.depto,
      };
      return state;
    }
    default:
      return state;
  }
};

export default clientData;
