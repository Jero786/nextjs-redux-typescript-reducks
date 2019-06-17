import mongoose from 'mongoose';
import {save, findAll, findByTitleAndAuthors, deleteAll} from './article.controllers';

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

    afterEach(async () => {
        await deleteAll()
    });

    it('Should create a new article', async done => {
         const articles = await save({
            title: 'title testttt',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: [{}],
            is_active: true
         });

        expect(JSON.stringify(articles)).toContain(
            '"authors":[{}],"_id":null,"title":"title testttt","short_description":"short description","long_description":"long description"',
        );
        done();
    });

    it('Should filter all articles properly', async done => {
          await save({
            title: 'title testttt 2',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: [{}],
            is_active: true
         });
          await save({
            title: 'title testttt 3',
            short_description: 'short description 2',
            long_description: 'long description 2',
            created_at: '2019-05-13',
            authors: [{}],
            is_active: true
         });

        const allArticles = await findAll();
        expect(allArticles.length).toBe(2);

        done();
    });

    it('Should filter by title articles properly', async done => {
          await save({
            title: 'title testttt 2',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: [{}],
            is_active: true
         });
          await save({
            title: 'title testttt 3',
            short_description: 'short description 2',
            long_description: 'long description 2',
            created_at: '2019-05-13',
            authors: [{}],
            is_active: true
         });

        const filterArticles = await findByTitleAndAuthors('title testttt 2', '');
        expect(filterArticles.length).toBe(1);

        done();
    });

    it('Should filter by title articles properly', async done => {
          await save({
            title: 'title testttt 2',
            short_description: 'short description',
            long_description: 'long description',
            created_at: '2019-05-13',
            authors: ["1111", '4444'],
            is_active: true
         });
          await save({
            title: 'title testttt 3',
            short_description: 'short description 2',
            long_description: 'long description 2',
            created_at: '2019-05-13',
              authors: ['4444'],
            is_active: true
         });

        let filterArticles = await findByTitleAndAuthors('', '4444');
        expect(filterArticles.length).toBe(2);

        filterArticles = await findByTitleAndAuthors('title testttt 3', '4444');
        expect(filterArticles.length).toBe(1);
        done();
    });

});
