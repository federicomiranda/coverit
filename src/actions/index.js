export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
});

export const selectMoto = () => ({
  type: 'MOTO',
});

export const selectAuto = () => ({
  type: 'AUTO',
});

export const setCP = (cp) => ({
  type: 'SET_CP',
  payload: cp,
});

export const removeCP = () => ({
  type: 'REMOVE_CP',
});

export const setLoc = (loc) => ({
  type: 'SET_LOCALIDAD',
  payload: loc,
});

export const removeLoc = () => ({
  type: 'REMOVE_LOCALIDAD',
});

export const setVehiculoAsegurar = (data) => ({
  type: 'SET_VEHICULO_ASEGURAR',
  payload: data,
});

export const setClientData = (data) => ({
  type: 'SET_CLIENT_DATA',
  payload: data,
});

export const setEditData = (data) => ({
  type: 'SET_EDIT_DATA',
  payload: data,
});

export const addClientData = (data) => ({
  type: 'ADD_CLIENT_DATA',
  payload: data,
});

export const addClientTributeData = (data) => ({
  type: 'ADD_TRIBUTE_DATA',
  payload: data,
});

export const addClientPersonalData = (data) => ({
  type: 'ADD_PERSONAL_DATA',
  payload: data,
});

export const addClientDirection = (data) => ({
  type: 'ADD_CLIENT_DIRECTION',
  payload: data,
});

export const setSA = (data) => ({
  type: 'SET_SUMA_ASEGURADA',
  payload: data,
});

export const setSolicitud = (data) => ({
  type: 'SET_SOLICITUD',
  payload: data,
});

export const setCoberturas = (data) => ({
  type: 'SET_COBERTURAS',
  payload: data,
});

export const setCoberturaSeleccionada = (data) => ({
  type: 'SET_COBERTURA_SELECCIONADA',
  payload: data,
});

export const setDataVehiculo = (data) => ({
  type: 'SET_DATA_VEHICULO',
  payload: data,
});

export const setCategorias = (data) => ({
  type: 'SET_CATEGORIAS',
  payload: data,
});

export const setVigencia = (data) => ({
  type: 'SET_VIGENCIA',
  payload: data,
});
