import express from 'express';
import next from 'next';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import routes from './routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src/client', dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare()
    .then(() => {
        const server = express();

        // middleware
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(cors());
        server.use(cookieParser());

        if (dev) {
            server.use(morgan('dev'));
        }

        // initialize register APIs
        routes(server);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) throw err;

            console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });
