import {combineReducers} from 'redux';
import drugs from './drugReducer';
import { errorReducer } from 'v-react';

const rootReducer = combineReducers({  errorReducer, drugs });

export default rootReducer;