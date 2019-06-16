// Libs
import {fromJS} from 'immutable';
import * as types from './author.types';
import {createReducer} from '../../utils';

const initialState = fromJS({
    isRequesting: false,
    authors: [],
});

const authors = createReducer(initialState)({
    [types.REQUEST_SEARCH]: state => state.merge({isRequesting: true}),
    [types.REQUEST_SEARCH_COMPLETED]: onSearchCompleted,
    [types.REQUEST_SEARCH_FAILED]: state => state.merge({isRequesting: false}),
});

function onSearchCompleted(state, action) {
    return state.merge({
        isRequesting: false,
        authors: action.payload || [],
    });
}

export default authors;
