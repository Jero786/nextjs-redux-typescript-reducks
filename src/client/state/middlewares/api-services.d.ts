type RestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export interface AsyncActionBody {
    async: boolean;
    path: string;
    method: RestMethod;
    body?: any;
    actionAfterCompleted?: object,
}

export interface AsyncActionStructure {
    type: string;
    meta: AsyncActionBody;
}

export interface SyncActionStructure {
    type: string;
    payload?: any;
}
