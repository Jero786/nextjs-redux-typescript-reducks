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
        console.log(`Error - findAll : ${err}`);
    }
};

function defaultResponse(err, response) {
    if (err) {
        console.error(`Error caused by [${err}]`);
        return err;
    }
    return response;
}
