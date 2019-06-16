// Libs
import { fromJS } from 'immutable';

export const getAuthors = (state = fromJS({})) => {
    const authors = state.get('author');
    if (authors && authors.get) {
        return authors.get('authors');
    }
};
export const isRequesting = (state = fromJS({})) => {
    const authors = state.get('author');
    if (authors && authors.get) {
        return authors.get('isRequesting');
    }
};
