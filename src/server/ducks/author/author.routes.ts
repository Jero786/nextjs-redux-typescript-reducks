// Libs
import {RoutesInputType} from '../../types/routes';

// Model
import {findAll, save, deleteOne} from './author.controllers';

async function authorApi(app:RoutesInputType) {
    app.post('/api/v1/authors', async (req, res) => {
        try {
            console.log('AUTHORS LOG ------> ' + JSON.stringify(req.body));

            res.send(await save(req.body));
        } catch(err) {
            res.send(err);
        }
    });
    //@ts-ignore
    app.get('/api/v1/authors', async (req, res) => {
        try {
            //const title = req.query.title;
            //const authorId = req.query.authorId;
            res.send(await findAll());
        } catch(err) {
            res.send(err);
        }
    });
    //@ts-ignore
    app.delete('/api/v1/authors/:id', async (req, res) => {
        try {
            res.send(await findAll());
        } catch(err) {
            res.send(err);
        }
    });
    //@ts-ignore
    app.put('/api/v1/authors', async (req, res) => {
        try {
            res.send(await deleteOne(req.params.id));
        } catch(err) {
            res.send(err);
        }
    });
}

const authorsRoutes = [
    authorApi
];

export default authorsRoutes;
