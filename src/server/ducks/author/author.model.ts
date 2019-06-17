// Libs
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

// Types
import { Schema } from 'mongoose';

export const AuthorSchema: Schema = new Schema({
    title: { type: String, required: true },
    updated_at: { type: String, required: false },
    created_at: { type: String, required: true },
    deleted_at: { type: String, required: false },
    is_active: { type: Boolean, required: true },
});

AuthorSchema.plugin(mongoosePaginate);

const AuthorModel = mongoose.model('Author', AuthorSchema);

export default AuthorModel;
