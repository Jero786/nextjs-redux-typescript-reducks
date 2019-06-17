// Libs
import mongoose from 'mongoose';
import mongoosePaginate from'mongoose-paginate-v2';

// Types
import {Schema} from 'mongoose';

export const ArticleSchema: Schema = new Schema({
    title: {type: String, required: true},
    short_description: {type: String, required: false},
    long_description: {type: String, required: false},
    updated_at: {type: String, required: false},
    created_at: {type: String, required: true},
    deleted_at: {type: String, required: false},
    authors: {type: Array, required: true},
    is_active: {type: Boolean, required: true}
});

ArticleSchema.plugin(mongoosePaginate);

export default mongoose.model('Article', ArticleSchema);
