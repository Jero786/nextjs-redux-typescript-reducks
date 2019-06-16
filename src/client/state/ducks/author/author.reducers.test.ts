// Libs
import { fromJS } from 'immutable';

// Reducer
import reducer from './author.reducers';

// Types
import * as Actions from './author.actions';

describe('Author reducer', () => {

    it('should request search', () => {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestSearch());

        expect(result.get('isRequesting')).toBe(true);
    });

    it('should request author completed', function() {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestSearchCompleted());

        expect(result.get('isRequesting')).toBe(false);
    });

    it('should request new Author failed', function() {
        const initialState = fromJS({});

        const result = reducer(initialState, Actions.requestSearchFailed());

        expect(result.get('isRequesting')).toBe(false);
    });

});
