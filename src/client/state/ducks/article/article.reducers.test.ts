// Libs
import { fromJS } from 'immutable';

// Reducer
import reducer from './article.reducers';

// Types
import * as Actions from './article.actions';

describe('Article reducer', () => {

    it('should request search', () => {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestSearch());

        expect(result.get('isRequesting')).toBe(true);
    });

    it('should add new article', () => {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.newArticleShown());

        expect(result.get('articles').length).toBe(1);
    });

    it('should not add more than one new article', () => {
        const initialState = fromJS({});
        const stateUpdated = reducer(initialState, Actions.newArticleShown());

        const result = reducer(stateUpdated, Actions.newArticleShown());

        expect(result.get('articles').length).toBe(1);
    });

    it('should request new article', function() {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestNewArticle({ title: 'newArticle' }));

        expect(result.get('isRequestingNewArticle')).toBe(true);
    });

    it('should request new article completed', function() {
        const initialState = fromJS({articles: [{_id: ''}, {_id: '123123'}]});

        const result = reducer(initialState, Actions.requestNewArticleCompleted());

        expect(result.get('isRequestingNewArticle')).toBe(false);
    });

    it('should request new article failed', function() {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestNewArticleFailed());

        expect(result.get('isRequestingNewArticle')).toBe(false);
    });

    it('should request change article', function () {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestChangeArticle({title: 'some title'}));

        expect(result.get('isRequestingChangeArticle')).toBe(true);
    });

    it('should request change article completed', function () {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestChangeArticleCompleted());

        expect(result.get('isRequestingChangeArticle')).toBe(false);
    });

    it('should request change article failed', function () {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestChangeArticleFailed());

        expect(result.get('isRequestingChangeArticle')).toBe(false);
    });

    it('should request delete article', function () {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestDeleteArticle('123'));

        expect(result.get('isRequestingDeleteArticle')).toBe(true);
    });

});
