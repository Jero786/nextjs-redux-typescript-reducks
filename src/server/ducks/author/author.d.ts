export {Document} from 'mongoose';

export interface Authors extends Document {
    _id:string,
    name:string
}
