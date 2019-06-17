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
    isRequestingByTitleAndAuthor: false,
    isCallRefetchingArticles: false,
});

const articles = createReducer(initialState)({
    [types.REQUEST_CHANGE_ARTICLE]: state => state.merge({isRequestingChangeArticle: true}),
    [types.REQUEST_CHANGE_ARTICLE_COMPLETED]: state => state.merge({isRequestingChangeArticle: false}),
    [types.REQUEST_CHANGE_ARTICLE_FAILED]: state => state.merge({isRequestingChangeArticle: false}),
    [types.REQUEST_SEARCH_BY_TITLE_AND_AUTHOR]: state => state.merge({isRequestingByTitleAndAuthor: true}),
    [types.REQUEST_SEARCH_BY_TITLE_AND_AUTHOR_COMPLETED]: onSearchByTitleAndAuthor,
    [types.REQUEST_SEARCH_BY_TITLE_AND_AUTHOR_FAILED]: state => state.merge({isRequestingByTitleAndAuthor: false}),
    [types.REQUEST_NEW_ARTICLE]: state => state.merge({isRequestingNewArticle: true}),
    [types.REQUEST_NEW_ARTICLE_COMPLETED]:state => state.merge({isRequestingNewArticle: false}),
    [types.REQUEST_NEW_ARTICLE_FAILED]: state => state.merge({isRequestingNewArticle: false}),
    [types.REQUEST_SEARCH]: state => state.merge({isRequesting: true}),
    [types.REQUEST_SEARCH_COMPLETED]: onSearchCompleted,
    [types.REQUEST_SEARCH_FAILED]: state => state.merge({isRequesting: false}),
    [types.CALL_REFETCHING_ARTICLES]: state => state.merge({isCallRefetchingArticles: true}),
    [types.CALL_REFETCHING_ARTICLES_COMPLETED]: state => state.merge({isCallRefetchingArticles: false}),
    [types.NEW_ARTICLE_SHOWN]: onNewArticleShown
});

function newArticleFactory() {
    return {
        title: 'Title',
        short_description: 'Some short description',
        long_description: 'Some long description here',
        authors:[],
        is_active: true
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

function onSearchByTitleAndAuthor(state, action) {
    return state.merge({
        isRequestingByTitleAndAuthor: false,
        articles: action.payload || [],
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
