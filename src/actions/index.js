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
