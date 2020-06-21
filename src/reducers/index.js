import { combineReducers } from 'redux';
import vehiculoReducer from './vehiculoReducer';

const allReducers = combineReducers({
  vehiculo: vehiculoReducer,
});

export default allReducers;
