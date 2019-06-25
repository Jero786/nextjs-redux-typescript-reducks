import articleRoutes from '../ducks/article/article.routes';

// Register your routes here.
const allRoutes = [...articleRoutes];

export default function initRoutes(app) {
    allRoutes.forEach(route => route(app));
}
