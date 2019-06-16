// Libs
import { fromJS } from 'immutable';

export const getArticles = (state = fromJS({})) => {
    const article = state.get('article');
    if (article && article.get) {
        return article.get('articles');
    }
};
export const isRequesting = (state = fromJS({})) => {
    const article = state.get('article');
    if (article && article.get) {
        return article.get('isRequesting');
    }
};

export const isCallRefetchingArticles = (state = fromJS({})) => {
    const article = state.get('article');
    if (article && article.get) {
        return article.get('isCallRefetchingArticles');
    }
};
