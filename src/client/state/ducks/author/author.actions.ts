import * as types from './author.types';
import {AsyncActionStructure, SyncActionStructure} from '../../middlewares/api-services';

export const requestSearch = (): AsyncActionStructure => ({
    type: types.REQUEST_SEARCH,
    meta: {
        async: true,
        path: `/authors`,
        method: 'GET',
    },
});

export const requestSearchCompleted = (): SyncActionStructure => ({ type: types.REQUEST_SEARCH_COMPLETED });
export const requestSearchFailed = (): SyncActionStructure => ({ type: types.REQUEST_SEARCH_FAILED });
