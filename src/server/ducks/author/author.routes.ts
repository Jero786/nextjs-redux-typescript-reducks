// Libs
import { RoutesInputType } from '../../types/routes';

// Model
import { findAll } from './author.controllers';

async function authorApi(app: RoutesInputType) {
    // @ts-ignore
    app.get('/api/v1/authors', async (req, res) => {
        try {
            res.send(await findAll());
        } catch (err) {
            res.send(err);
        }
    });
}

const authorsRoutes = [authorApi];

export default authorsRoutes;
