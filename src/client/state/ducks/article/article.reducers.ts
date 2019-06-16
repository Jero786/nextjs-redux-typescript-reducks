// Libs
import {fromJS} from 'immutable';
import * as types from './article.types';
import {createReducer} from '../../utils';

const initialState = fromJS({
    isRequesting: false,
    isNewArticleVisible: false,
    isRequestingNewArticle: false,
    isRequestingChangeArticle: false,
    isRequestingDeleteArticle: false,
});

const articles = createReducer(initialState)({
    [types.REQUEST_CHANGE_ARTICLE]: state => state.merge({isRequestingChangeArticle: true}),
    [types.REQUEST_CHANGE_ARTICLE_COMPLETED]: onRequestChangeArticledCompleted,
    [types.REQUEST_CHANGE_ARTICLE_FAILED]: state => state.merge({isRequestingChangeArticle: false}),
    [types.REQUEST_NEW_ARTICLE]: state => state.merge({isRequestingNewArticle: true}),
    [types.REQUEST_NEW_ARTICLE_COMPLETED]: onRequestNewArticledCompleted,
    [types.REQUEST_NEW_ARTICLE_FAILED]: state => state.merge({isRequestingNewArticle: false}),
    [types.REQUEST_SEARCH]: state => state.merge({isRequesting: true}),
    [types.REQUEST_SEARCH_COMPLETED]: onSearchCompleted,
    [types.REQUEST_SEARCH_FAILED]: state => state.merge({isRequesting: false}),
    [types.NEW_ARTICLE_SHOWN]: onNewArticleShown
});

function newArticleFactory() {
    return {
        title: 'CHANGE NEW TITLE',
        short_description: 'CHANGE SHORT DESCRIPTION',
        long_description: 'CHANGE LONG DESCRIPTION',
        authors:[]
    };
}

function hasNewArticleWithoutSave(articles = []) {
    const result = articles.filter(article => article._id === undefined);
    return result && result.length >= 1;
}

function onSearchCompleted(state, action) {
    return state.merge({
        isRequesting: false,
        articles: action.payload || [],
    });
}

function onRequestNewArticledCompleted(state, action) {
    return state.merge({
        isRequestingNewArticle: false,
        articles: action.payload
    });
}

function onRequestChangeArticledCompleted(state, action) {
    return state.merge({
        isRequestingChangeArticle: false,
        articles: action.payload
    });
}

function onNewArticleShown(state) {
    const articles = state.get('articles') || [];
    if (hasNewArticleWithoutSave(articles)) {
        return state;
    }
    const articlesUpdated = articles.concat([newArticleFactory()]);
    return state.merge({articles: articlesUpdated});
}

export default articles;
