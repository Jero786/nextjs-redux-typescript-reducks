// Libs
import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';

// Middleware
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { apiService } from './middlewares';

// Ducks
import * as reducers from './ducks';

function createMiddleware() {
    return composeWithDevTools(
        applyMiddleware(
            apiService,
            createLogger(true),
        ),
    );
}

export function makeStore(initialState = fromJS({})) {
    const rootReducer = combineReducers(reducers);
    return createStore(
        rootReducer,
        initialState,
        createMiddleware()
    );
}
