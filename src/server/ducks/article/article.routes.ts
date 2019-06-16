// Libs
import {RoutesInputType} from '../../types/routes';

// Model
import {findAll, save, change, deleteOne} from './article.controllers';

async function articleApi(app: RoutesInputType) {
    //@ts-ignore
    app.get('/api/v1/articles', async (req, res) => {
        try {
            res.json(await findAll());
        } catch (err) {
            console.error('ERROR ' + err);
            res.status(500).json('Something goes wrong when try to fetch all the articles');
        }
    });
    app.put('/api/v1/articles', async (req, res) => {
        try {
            const articles = await change(req.body);
            console.log('ARTICLES RESPONSE LOG POST ------> ' + JSON.stringify(articles));
            res.json(await findAll());
        } catch (err) {
            console.error('ERROR ' + err);
            res.status(500).json('Something goes wrong when try to change the article ');
        }
    });
    app.delete('/api/v1/articles/:id', async (req, res) => {
        try {
            console.log('LLEGO DELETE:: ');
            const articleId = req.params.id;
            console.log('articleId :: ' + articleId);
            await deleteOne(articleId);
            res.json(200);
        } catch (err) {
            console.error('ERROR ' + err);
            res.status(500).json('Something goes wrong when try to delete the article ');
        }
    });
    app.post('/api/v1/articles', async (req, res) => {
        try {
            const articles = await save(req.body);
            console.log('ARTICLES RESPONSE LOG POST ------> ' + JSON.stringify(articles));
            res.json(await findAll());
        } catch (err) {
            console.error('ERROR ' + err);
            res.status(500).json('Something goes wrong when try to change the add the new article ');
        }
    });
}

const articleRoutes = [
    articleApi
];

export default articleRoutes;
