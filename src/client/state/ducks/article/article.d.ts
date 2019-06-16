
import {CommonContracts} from '../common';

export interface Authors {
    _id:string,
    name:string
}

export interface Article {
    _id:string,
    title:string,
    short_description:string,
    long_description:string,
    updated_at:string,
    created_at:number,
    deleted_at:string,
    authors:Authors[]
}

export interface ArticleResponse extends CommonContracts.Pagination {
    articles:Article[]
}
