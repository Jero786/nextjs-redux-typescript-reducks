// Model
import AuthorModel from './author.model';

// Type
import { Pagination } from '../common/commons.d';

export const findAll = async (options?: Pagination) => {
    try {
        if (options) {
            return await AuthorModel.paginate({}, options, defaultResponse);
        }
        return await AuthorModel.find(defaultResponse);

    } catch (err) {
        console.log(`Error - findAll : ${  err}`);
    }
};

export const save = async data => {
    try {
        data.created_at = new Date().toISOString();
        const authorModel = new AuthorModel(data);

        authorModel
            .save((err, response) => {
                if (err) {
                    console.error(`Error caused by [${err}]`);
                    return err;
                }
                return response;
            }).then((data) => {
            return data;
        })
            .catch((error: Error) => {
                throw error;
            });
    } catch (err) {
        console.log(`Error - Save : ${err}`);
        return data;
    }
};

export const deleteOne = async authorId => {
    try {
        AuthorModel.deleteOne(authorId);
        return 'success';
    } catch (err) {
        console.log(`Error - Delete one : ${err}`);
    }
};

function defaultResponse(err, response) {
    if (err) {
        console.error(`Error caused by [${err}]`);
        return err;
    }
    return response;

}
