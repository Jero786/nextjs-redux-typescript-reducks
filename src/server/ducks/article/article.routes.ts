// Libs
import { RoutesInputType } from '../../types/routes';

// Model
import { findAll, save, change, deleteOne, findByTitleAndAuthors } from './article.controllers';

async function articleApi(app: RoutesInputType) {
    app.get('/api/v1/articles', async (req, res) => {
        try {
            const { title } = req.query;
            const { author } = req.query;

            if (title || author) {
                res.json(await findByTitleAndAuthors(title, author));
            } else {
                res.json(await findAll());
            }
        } catch (err) {
            console.error(`ERROR ${err}`);
            res.status(500).json('Something goes wrong when try to fetch all the articles');
        }
    });
    app.put('/api/v1/articles', async (req, res) => {
        try {
             await change(req.body);
            res.json({});
        } catch (err) {
            console.error(`ERROR ${err}`);
            res.status(500).json('Something goes wrong when try to change the article ');
        }
    });

    app.delete('/api/v1/articles/:id', async (req, res) => {
        try {
            const articleId = req.params.id;
            await deleteOne(articleId);
            res.json({});
        } catch (err) {
            console.error(`ERROR ${err}`);
            res.status(500).json('Something goes wrong when try to delete the article ');
        }
    });

    app.post('/api/v1/articles', async (req, res) => {
        try {
            await save(req.body);
            res.json({});
        } catch (err) {
            console.error(`ERROR ${err}`);
            res.status(500).json('Something goes wrong when try to change the add the new article ');
        }
    });
}

const articleRoutes = [articleApi];

export default articleRoutes;
