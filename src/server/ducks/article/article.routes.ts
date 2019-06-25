// Libs
import { RoutesInputType } from '../../types/routes';

async function articleApi(app: RoutesInputType) {
    // @ts-ignore
    app.get('/api/v1/articles', async (req, res) => {
        try {
            res.json('hello brisa');
        } catch (err) {
            console.error(`ERROR ${err}`);
            res.status(500).json('Something goes wrong when try to fetch all the articles');
        }
    });
}

const articleRoutes = [articleApi];

export default articleRoutes;
