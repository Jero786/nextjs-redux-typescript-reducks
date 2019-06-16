import reducer from './article.reducers';

import * as articleActions from './article.actions';
import * as articleOperation from './article.operations';
import * as articleSelectors from './article.selectors';

export { articleOperation, articleSelectors, articleActions };

export default reducer;
