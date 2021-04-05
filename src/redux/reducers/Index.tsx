import { combineReducers } from 'redux';
import { GeneralReducer } from './GeneralReducer';

export const Reducers = combineReducers({
    general: GeneralReducer,
});