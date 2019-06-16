import mongoose from 'mongoose';
import Article from './article.model';

describe('Article model', () => {
    beforeAll(async () => {
        // @ts-ignore
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
        });
    });

    afterAll(async () => {
        mongoose.connection.close();
    });

    it('Should throw validation errors', done => {
        const article = new Article();

        expect(article.validate).toThrow();
        done();
    });

    it('Should save a user', async done => {
        const article = new Article({
            title: 'title testttt',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: [{}],
        });
        const spy = jest.spyOn(article, 'save');
        article.save();

        expect(spy).toHaveBeenCalled();

        expect(article).toMatchObject({
            title: expect.any(String),
            short_description: expect.any(String),
            long_description: expect.any(String),
            created_at: expect.any(String),
            authors: expect.any(Array),
        });

        expect(article.title).toBe('title testttt');
        expect(article.short_description).toBe('short description');
        expect(article.long_description).toBe('long description');
        expect(article.created_at).toBe('2019-05-13');
        done();
    });
});
