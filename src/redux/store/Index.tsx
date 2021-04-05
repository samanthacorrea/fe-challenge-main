import { createStore, applyMiddleware } from 'redux';
import { Reducers } from '../reducers/Index';
import thunk from "redux-thunk";

export const Store = createStore(Reducers, applyMiddleware(thunk));