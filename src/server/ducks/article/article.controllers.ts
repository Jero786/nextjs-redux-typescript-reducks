// Model
import ArticleModel from './article.model';

// Type
import {Pagination} from '../common/commons.d';

interface QueryString {
    is_active: boolean;
    title?: string;
    authors?: any[];
}

const isTesting = process.env.NODE_ENV === 'test'

export const findAll = async (options?: Pagination) => {
    try {
        if (options) {
            return await ArticleModel.paginate({}, options, defaultResponse);
        }
        return await ArticleModel.find({'is_active': true}, defaultResponse);
    } catch (err) {
        console.error(`Error - when try to fetch all: ${err}`);
    }
};

export const findOne = async (articleId) => {
    try {
        return await ArticleModel.find({'_id': articleId, 'is_active': true}, defaultResponse);
    } catch (err) {
        console.error(`Error - when try to fetch all: ${err}`);
    }
};

export const findByTitleAndAuthors = async (title: string, authors: string) => {
    try {
        const query: QueryString = {is_active: true};

        if (title) {
            query.title = title;
        }
        if (authors) {
            //@ts-ignore
            query.authors = {'$elemMatch': {'$in': authors.split(',')}};
        }
        return await ArticleModel.find(query);
    } catch (err) {
        console.error(`Error - when try to fetch articles by title: ${title} and author: ${authors}, Message: ${err}`);
    }
};

export const save = async data => {
    try {
        data._id = null;
        data.is_active = true;
        data.created_at = new Date().toISOString();
        const newArticle = await ArticleModel.create(data);

        if (isTesting) {
            newArticle._id = '123';
            return newArticle;
        }
    } catch (err) {
        console.error(`Error - Save article: ${err}`);
    }
};

export const change = async data => {
    try {
        data.updated_at = new Date().toISOString();
        const articleChanged = await ArticleModel.findByIdAndUpdate(data._id, data, defaultResponse);

        console.log('ARTICLES CHANGEDDDD LOG ------> ' + JSON.stringify(articleChanged));


        if (isTesting) {
            return articleChanged;
        }
    } catch (err) {
        console.error(`Error - Changing article : ${err}`);
    }
};

export const deleteOne = async articleId => {
    try {
        const articleResult = await ArticleModel.findById(articleId, defaultResponse);
        articleResult.deleted_at = new Date().toISOString();
        articleResult.is_active = false;
        await articleResult.save();
    } catch (err) {
        console.error(`Error - Deleting article: ${err}`);
    }
};

export const deleteAll = async () => {
    try {
        await ArticleModel.deleteMany({});
    } catch (err) {
        console.error(`Error - Deleting article: ${err}`);
    }
};

function defaultResponse(err, response) {
    if (err) {
        console.error(`Error caused by [${err}]`);
        return err;
    }
    return response;
}
