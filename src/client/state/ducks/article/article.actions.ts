import * as types from './article.types';
import { AsyncActionStructure, SyncActionStructure } from '../../middlewares/api-services';

export const newArticleShown = (): SyncActionStructure => ({ type: types.NEW_ARTICLE_SHOWN });

export const requestSearch = (): AsyncActionStructure => ({
    type: types.REQUEST_SEARCH,
    meta: {
        async: true,
        path: `/articles`,
        method: 'GET',
    },
});
export const requestSearchCompleted = (): SyncActionStructure => ({ type: types.REQUEST_SEARCH_COMPLETED });
export const requestSearchFailed = (): SyncActionStructure => ({ type: types.REQUEST_SEARCH_FAILED });

export const requestDeleteArticle = (articleId): AsyncActionStructure => ({
    type: types.REQUEST_DELETE,
    meta: {
        async: true,
        path: `/articles/${articleId}`,
        method: 'DELETE',
    },
});
export const requestDeleteCompleted = (): SyncActionStructure => ({ type: types.REQUEST_DELETE_COMPLETED });
export const requestDeleteFailed = (): SyncActionStructure => ({ type: types.REQUEST_DELETE_FAILED });

export const requestNewArticle = (articlePayload): AsyncActionStructure => ({
    type: types.REQUEST_NEW_ARTICLE,
    meta: {
        async: true,
        path: `/articles`,
        method: 'POST',
        body: articlePayload,
    },
});
export const requestNewArticleCompleted = (): SyncActionStructure => ({ type: types.REQUEST_NEW_ARTICLE_COMPLETED });
export const requestNewArticleFailed = (): SyncActionStructure => ({ type: types.REQUEST_NEW_ARTICLE_FAILED });

export const requestChangeArticle = (articlePayload): AsyncActionStructure => ({
    type: types.REQUEST_CHANGE_ARTICLE,
    meta: {
        async: true,
        path: `/articles`,
        method: 'PUT',
        body: articlePayload,
    },
});
export const requestChangeArticleCompleted = (): SyncActionStructure => ({ type: types.REQUEST_CHANGE_ARTICLE_COMPLETED });
export const requestChangeArticleFailed = (): SyncActionStructure => ({ type: types.REQUEST_CHANGE_ARTICLE_FAILED });


