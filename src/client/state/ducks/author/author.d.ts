
import {CommonContracts} from '../common';

export interface Authors {
    _id:string,
    name:string
}

export interface AuthorResponse extends CommonContracts.Pagination {
    authors:Author[]
}
