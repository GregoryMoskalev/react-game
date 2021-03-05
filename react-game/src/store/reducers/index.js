import {combineReducers} from 'redux';
import settings from './settingsReducer'
import board from './boardReducer'

export default combineReducers({settings, board});
