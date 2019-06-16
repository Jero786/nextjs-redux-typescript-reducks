// Model
import ArticleModel from './article.model';

// Type
import { Pagination } from '../common/commons.d';

export const findAll = async (options?: Pagination) => {
    try {
        if (options) {
            return await ArticleModel.paginate({}, options, defaultResponse);
        }
        return await ArticleModel.find(defaultResponse);
    } catch (err) {
        console.log(`Error - when try to fetch all: ${err}`);
    }
};

interface QueryString {
    title?: string;
    author?: string;
}
export const findByTitleAndAuthors = async (title: string, author: string) => {
    try {
        const query: QueryString = {};

        if (title) {
            query.title = title;
        }

        if (author) {
            query.author = author;
        }

        return await ArticleModel.find(query);
    } catch (err) {
        console.log(`Error - when try to fetch all: ${err}`);
    }
};

export const save = async data => {
    try {
        data._id = null;
        data.created_at = new Date().toISOString();
        const newArticle = new ArticleModel(data);
        return await newArticle.save(err => {
            if (err) {
                console.error(`Error when try to add, caused by [${err}]`);
                return err;
            }
        });
    } catch (err) {
        console.log(`Error - Save article: ${err}`);
    }
};

export const change = async data => {
    try {
        data.updated_at = new Date().toISOString();
        return await ArticleModel.findByIdAndUpdate(data._id, data, err => {
            if (err) {
                console.error(`Error when try to update, caused by [${err}]`);
                return err;
            }
        });
    } catch (err) {
        console.log(`Error - Changing article : ${err}`);
    }
};

export const deleteOne = async articleId => {
    try {
        await ArticleModel.findByIdAndDelete(articleId, err => {
            if (err) {
                console.error(`Error when try to delete, caused by [${err}]`);
                return err;
            }
        });
    } catch (err) {
        console.log(`Error - Deleting article: ${err}`);
    }
};

function defaultResponse(err, response) {
    if (err) {
        console.error(`Error caused by [${err}]`);
        return err;
    }
    return response;
}
