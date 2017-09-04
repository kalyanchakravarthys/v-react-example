import {combineReducers} from 'redux';
import users from './userReducer';
import { errorReducer } from 'v-react';

const rootReducer = combineReducers({  errorReducer, users });

export default rootReducer;