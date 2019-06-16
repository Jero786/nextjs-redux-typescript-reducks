import articleRoutes from '../ducks/article/article.routes';
import authorRoutes from '../ducks/author/author.routes';

// Register your routes here.
const allRoutes = [
    ...articleRoutes,
    ...authorRoutes
];

export default function initRoutes(app) {
    allRoutes.forEach(route => route(app));
}
