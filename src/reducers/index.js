import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import vehiculoReducer from './vehiculoReducer';
import cpReducer from './cpReducer';
import locReducer from './locReducer';
import vehiculoAsegurar from './vehiculoAsegurar';
import clienteData from './clienteData';
import sumaAsegurada from './sumaAsegurada';

const allReducers = combineReducers({
  token: tokenReducer,
  vehiculo: vehiculoReducer,
  cp: cpReducer,
  loc: locReducer,
  asegurar: vehiculoAsegurar,
  cliente: clienteData,
  sumaAsegurada,
});

export default allReducers;
