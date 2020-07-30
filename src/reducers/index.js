import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import vehiculoReducer from './vehiculoReducer';
import cpReducer from './cpReducer';
import locReducer from './locReducer';
import vehiculoAsegurar from './vehiculoAsegurar';
import clienteData from './clienteData';
import sumaAsegurada from './sumaAsegurada';
import solicitud from './solicitud';
import coberturas from './coberturas';

const allReducers = combineReducers({
  token: tokenReducer,
  vehiculo: vehiculoReducer,
  cp: cpReducer,
  loc: locReducer,
  asegurar: vehiculoAsegurar,
  cliente: clienteData,
  sumaAsegurada,
  solicitud,
  coberturas,
});

export default allReducers;
