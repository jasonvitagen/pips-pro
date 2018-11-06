import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import * as reducers from './reducer';
import {cognitoSessionMiddleware, notificationMiddleware} from './middleware';

const middlewares = [
        thunk,
        promise(),
        cognitoSessionMiddleware,
        notificationMiddleware
    ],
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger());
}

export default createStore(
    combineReducers({...reducers}),
    composeEnhancers(applyMiddleware(...middlewares))
);
