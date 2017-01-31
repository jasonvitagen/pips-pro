import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as reducers from './reducer';
import {jwtDecodeMiddleware, notificationMiddleware} from './middleware';

const
    middlewares = [thunk, promise(), logger(), jwtDecodeMiddleware, notificationMiddleware]
    , composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(combineReducers({...reducers}), composeEnhancers(applyMiddleware(...middlewares)));