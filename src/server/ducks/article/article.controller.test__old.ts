import mongoose from 'mongoose';
import { save } from './article.controllers';

describe('Article controller', () => {
    beforeAll(async () => {
        // @ts-ignore
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    it('Should create a new article', async done => {
        const articles = await save({
            title: 'title testttt',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: [{}],
        });

        expect(JSON.stringify(articles)).toContain(
            '"title":"title testttt","short_description":"short description","long_description":"long description"',
        );
        done();
    });
});
